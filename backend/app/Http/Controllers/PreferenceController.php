<?php

namespace App\Http\Controllers;

use App\Models\UserPreference;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PreferenceController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();
        $preference = $user->preference ?? UserPreference::create(['user_id' => $user->id]);

        return response()->json(['preferences' => AuthController::preferenceData($preference, $user)]);
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'dark_mode' => ['sometimes', 'boolean'],
            'high_contrast' => ['sometimes', 'boolean'],
            'font_scale' => ['sometimes', 'numeric', Rule::in([1, 1.0, 1.2, 1.4, 1.6])],
            'sound_on' => ['sometimes', 'boolean'],
            'calm_mode' => ['sometimes', 'boolean'],
            'grade_year' => ['sometimes', Rule::in([1, 2])],
        ]);

        $user = $request->user();
        if (isset($data['grade_year'])) {
            $user->update(['grade_year' => $data['grade_year']]);
            unset($data['grade_year']);
        }

        $preference = $user->preference ?? new UserPreference(['user_id' => $user->id]);
        $preference->fill($data)->save();

        return response()->json(['preferences' => AuthController::preferenceData($preference->refresh(), $user->refresh())]);
    }
}
