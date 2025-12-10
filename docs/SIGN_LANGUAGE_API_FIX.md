# Sign Language - Gemini API Fix

## Issue
The sign language lesson generator was encountering Gemini API rate limit errors (429) with message "Quota exceeded for quota metric 'Generate Content API requests per minute'".

## Root Causes Identified

1. **SDK Mismatch**: The sign language service was using the older `@google/generative-ai` SDK while the rest of the app uses the newer `@google/genai` SDK
2. **Model Inconsistency**: Sign language service was trying to use `gemini-1.5-flash` instead of the configured `gemini-2.5-flash`
3. **No Retry Logic**: API calls had no retry mechanism for transient failures
4. **Poor Error Handling**: Generic error messages didn't help users understand quota issues

## Solutions Implemented

### 1. Unified SDK Usage
**Changed**: Updated `src/services/geminiLesson.ts` to use `@google/genai` SDK

```typescript
// OLD (inconsistent)
import { GoogleGenerativeAI } from '@google/generative-ai';

// NEW (consistent with rest of app)
import { GoogleGenAI } from '@google/genai';
```

### 2. Use Correct Model
**Changed**: Service now reads from environment variables like the rest of the app

```typescript
// Now uses VITE_GEMINI_MODEL from .env (gemini-2.5-flash by default)
this.modelName = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash-exp';
```

### 3. Exponential Backoff Retry Logic
**Added**: New `retryWithBackoff()` method with 3 retries

```typescript
private async retryWithBackoff<T>(fn: () => Promise<T>, retryCount = 0): Promise<T>
```

- **Max Retries**: 3 attempts
- **Base Delay**: 1 second
- **Exponential**: Each retry waits 2^retryCount seconds
- **Smart Detection**: Only retries on rate limit errors (429, "quota", "rate limit")

**Retry Timeline**:
- Attempt 1: Immediate
- Attempt 2: After 1 second
- Attempt 3: After 2 seconds
- Attempt 4: After 4 seconds
- Total max wait: ~7 seconds

### 4. Enhanced Error Messages
**Added**: User-friendly error display in `SignLanguageSetup.tsx`

- Shows clear error message at top of page
- Detects quota errors and provides link to Google AI Studio
- Scrolls to top to ensure visibility
- No more generic alerts

**Visual Error UI**:
```tsx
{errorMessage && (
  <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-xl">
    <div className="flex items-start">
      <div className="flex-shrink-0 text-red-500 mr-3">⚠️</div>
      <div>
        <div className="font-medium text-red-400 mb-1">Error Generating Lesson</div>
        <div className="text-sm text-red-300">{errorMessage}</div>
        {errorMessage.includes('quota') && (
          <div className="mt-2 text-xs text-red-400">
            Tip: Wait a few minutes or check your API quota at Google AI Studio
          </div>
        )}
      </div>
    </div>
  </div>
)}
```

### 5. Improved Logging
**Added**: Detailed console logging for debugging

```typescript
console.log('[Gemini] Initialized sign language service with model: gemini-2.5-flash');
console.log('[Setup] Generating lesson with params:', { topic, difficulty, ... });
console.log('[Gemini] Rate limited. Retrying in 1000ms... (attempt 1/3)');
console.log('[Gemini] Lesson generated successfully');
```

## Files Modified

1. **src/services/geminiLesson.ts** (Main fixes)
   - Changed SDK import from `@google/generative-ai` to `@google/genai`
   - Added `retryWithBackoff()` method
   - Updated `generateLesson()` to use retry logic
   - Updated API call to use new SDK format (`ai.models.generateContent()`)
   - Improved error messages

2. **src/pages/SignLanguageSetup.tsx** (Better UX)
   - Added `errorMessage` state
   - Enhanced `handleGenerateLesson()` error handling
   - Added error display UI at top of page
   - Added detailed logging

## Testing Instructions

### 1. Verify Environment Variables
Check your `.env` file has:

```env
VITE_GEMINI_API_KEY=AIzaSyCSuY1O28laLnWcTlEAowbj1R9fjM-bLSw
VITE_GEMINI_MODEL=gemini-2.5-flash
```

### 2. Test Normal Flow
1. Navigate to Sign Language home page (`/sign-language`)
2. Enter a topic (e.g., "Photosynthesis")
3. Click "Start Learning"
4. Customize settings on setup page
5. Click "Generate Lesson"
6. Should see console logs:
   ```
   [Setup] Generating lesson with params: {...}
   [Gemini] Initialized sign language service with model: gemini-2.5-flash
   [Gemini] Generating lesson for: Photosynthesis
   [Gemini] Lesson generated successfully
   ```
7. Navigate to lesson view

### 3. Test Rate Limiting (if still occurring)
If you still hit rate limits:

1. You should see retry attempts:
   ```
   [Gemini] Rate limited. Retrying in 1000ms... (attempt 1/3)
   [Gemini] Rate limited. Retrying in 2000ms... (attempt 2/3)
   ```

2. If all retries fail, you'll see:
   - Red error box at top of setup page
   - Error message: "API quota exceeded. Please wait a moment..."
   - Link to Google AI Studio for quota management

3. Console error:
   ```
   [Setup] Failed to generate lesson: API quota exceeded...
   ```

### 4. Verify API Quota
If rate limits persist:

1. Visit https://aistudio.google.com/
2. Check your API key's quota
3. Verify you're on the correct model (`gemini-2.5-flash`)
4. Consider waiting a few minutes before retrying

## Expected Behavior

### ✅ Success Case
- Lesson generates within 3-5 seconds
- User navigates to lesson view
- Console shows successful generation

### ⚠️ Temporary Rate Limit
- Automatic retries with delays
- User sees "Generating Your Lesson..." for ~7 seconds
- Eventually succeeds or shows error

### ❌ Persistent Quota Error
- Clear error message displayed
- Link to check quota
- User can modify settings and try again
- No generic alerts

## API Model Information

### gemini-2.5-flash
- **Speed**: Fast (< 3 seconds typical)
- **Cost**: Lower
- **Rate Limit**: 15 requests/minute (free tier)
- **Best For**: Production use, frequent requests

### Alternative Models (if needed)
You can change the model in `.env`:

```env
# Slower but more quota
VITE_GEMINI_MODEL=gemini-1.5-pro

# Experimental (fastest)
VITE_GEMINI_MODEL=gemini-2.0-flash-exp
```

## Quota Management Tips

1. **Free Tier Limits**: 
   - 15 requests per minute
   - 1500 requests per day
   - 1 million tokens per minute

2. **If Hitting Limits**:
   - Wait 1 minute between requests
   - Use caching for repeated lessons
   - Consider upgrading to paid tier

3. **Best Practices**:
   - Test with different topics to avoid repeated similar requests
   - Clear browser cache if testing multiple times
   - Monitor console for retry attempts

## Removed Features

❌ **Mock Fallback**: Removed as per user request ("no need fallback gemini key is new")
- Previous implementation had `generateMockLesson()` method
- Now properly handles errors with retries instead of fallback

## Next Steps (Optional)

If rate limiting continues to be an issue, consider:

1. **Client-side caching**: Store generated lessons in localStorage
2. **Request debouncing**: Prevent double-clicks on "Generate Lesson"
3. **Batch processing**: Generate multiple sections separately
4. **Premium tier**: Upgrade Gemini API for higher quotas

## Support

If issues persist:
1. Check browser console for detailed error logs
2. Verify API key at https://aistudio.google.com/
3. Ensure `.env` file has correct `VITE_GEMINI_API_KEY`
4. Try a different topic/shorter topic name
5. Wait 1-2 minutes and retry
