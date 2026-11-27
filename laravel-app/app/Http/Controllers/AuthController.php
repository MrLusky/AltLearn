<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserPreference;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'grade_year' => ['required', Rule::in([1, 2])],
        ], [
            'email.unique' => 'Este e-mail já tem uma conta. Tente entrar.',
            'password.min' => 'A senha precisa ter pelo menos 8 caracteres.',
            'password.confirmed' => 'As senhas não são iguais.',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => strtolower($data['email']),
            'password' => Hash::make($data['password']),
            'grade_year' => $data['grade_year'],
        ]);
        $preference = UserPreference::create(['user_id' => $user->id]);

        return response()->json($this->payload($user, $preference), 201);
    }

    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', strtolower($data['email']))->first();
        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages(['email' => ['E-mail ou senha incorretos.']]);
        }

        $preference = $user->preference ?? UserPreference::create(['user_id' => $user->id]);

        return response()->json($this->payload($user, $preference));
    }


    /**
     * Entrar/criar conta com Google (Google Identity Services).
     * O frontend envia o ID token (credential); aqui ele é conferido no endpoint oficial tokeninfo do Google.
     */
    public function google(Request $request): JsonResponse
    {
        $data = $request->validate([
            'credential' => ['required', 'string'],
            'grade_year' => ['nullable', Rule::in([1, 2])],
        ]);

        $clientId = config('altlearn.google_client_id');
        if (! $clientId) {
            return response()->json(['message' => 'O login com Google ainda não foi configurado no servidor.'], 503);
        }

        $response = Http::timeout(8)->get('https://oauth2.googleapis.com/tokeninfo', ['id_token' => $data['credential']]);
        $claims = $response->ok() ? $response->json() : null;

        $valid = $claims
            && ($claims['aud'] ?? null) === $clientId
            && in_array($claims['iss'] ?? '', ['accounts.google.com', 'https://accounts.google.com'], true)
            && filter_var($claims['email_verified'] ?? false, FILTER_VALIDATE_BOOLEAN)
            && ! empty($claims['sub']) && ! empty($claims['email']);

        if (! $valid) {
            throw ValidationException::withMessages(['credential' => ['Não foi possível confirmar o login com o Google. Tente de novo.']]);
        }

        $email = strtolower($claims['email']);
        $user = User::where('google_id', $claims['sub'])->first() ?? User::where('email', $email)->first();
        $created = false;

        if ($user) {
            if (! $user->google_id) {
                $user->update(['google_id' => $claims['sub']]); // vincula a conta existente ao Google
            }
        } else {
            $user = User::create([
                'name' => $claims['name'] ?? Str::before($email, '@'),
                'email' => $email,
                'google_id' => $claims['sub'],
                'password' => Hash::make(Str::random(40)), // sem senha utilizável: acesso só pelo Google
                'grade_year' => $data['grade_year'] ?? 1,
            ]);
            $created = true;
        }

        $preference = $user->preference ?? UserPreference::create(['user_id' => $user->id]);

        return response()->json($this->payload($user, $preference) + ['created' => $created], $created ? 201 : 200);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Até logo!']);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        $preference = $user->preference ?? UserPreference::create(['user_id' => $user->id]);

        return response()->json([
            'user' => $this->userData($user),
            'preferences' => $this->preferenceData($preference, $user),
        ]);
    }

    private function payload(User $user, UserPreference $preference): array
    {
        return [
            'token' => $user->createToken('altlearn-web')->plainTextToken,
            'user' => $this->userData($user),
            'preferences' => $this->preferenceData($preference, $user),
        ];
    }

    private function userData(User $user): array
    {
        return ['id' => $user->id, 'name' => $user->name, 'email' => $user->email, 'grade_year' => $user->grade_year];
    }

    public static function preferenceData(UserPreference $p, User $user): array
    {
        return [
            'dark_mode' => $p->dark_mode,
            'high_contrast' => $p->high_contrast,
            'font_scale' => $p->font_scale,
            'sound_on' => $p->sound_on,
            'calm_mode' => $p->calm_mode,
            'grade_year' => $user->grade_year,
        ];
    }
}
