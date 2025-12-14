# Virtual Try-On API Integration Guide

## Current Implementation

Your PahalStyle website now includes a **functional virtual try-on demo** with realistic AI processing simulation. The current implementation uses mock API responses for demonstration purposes.

## How It Works

1. **User uploads a photo** → Stored locally in browser (best results with full-body photos)
2. **User selects an Indian outfit** → From categories: Holi, Diwali, Formal, Casual
3. **AI processes the request** → Shows loading animation (1.5-3 seconds)
4. **Result displayed** → Composite image with Indian outfit prominently displayed
5. **Success actions** → Download, share, or try another outfit

## About Indian Outfits

PahalStyle specializes in **authentic Indian traditional wear**:
- **Holi Collection**: Kurtas, ethnic wear for festival celebrations
- **Diwali Collection**: Sarees, lehengas, anarkalis for festive occasions
- **Formal Collection**: Traditional formal wear, designer Indian outfits
- **Casual Collection**: Everyday comfortable Indian ethnic wear

The virtual try-on algorithm is optimized to showcase Indian clothing prominently on the user's photo, ensuring the traditional designs and patterns are clearly visible.

## File Structure

```
/services/virtualTryOnApi.ts    - API service with mock responses
/components/TryOnSection.tsx    - Main try-on component
/components/LoadingProgress.tsx - AI processing animation
/components/ErrorState.tsx      - Error handling UI
/components/SuccessAnimation.tsx - Success state with actions
```

## Integrating Real AI APIs

### Option 1: Replicate.com (Recommended)

Replicate hosts various AI models including virtual try-on models.

**Step 1:** Sign up at [replicate.com](https://replicate.com)

**Step 2:** Get your API token from account settings

**Step 3:** Replace mock API in `/services/virtualTryOnApi.ts`:

```typescript
export async function generateVirtualTryOn(
  request: TryOnRequest
): Promise<TryOnResponse> {
  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': 'Token YOUR_REPLICATE_API_TOKEN',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'VIRTUAL_TRYON_MODEL_VERSION', // e.g., "a16z/virtual-try-on"
        input: {
          person_image: request.userImage,
          garment_image: request.outfitImage,
        },
      }),
    });

    const prediction = await response.json();
    
    // Poll for results
    let result = await pollPrediction(prediction.id);
    
    return {
      success: true,
      resultImage: result.output,
      processingTime: result.metrics.predict_time,
    };
  } catch (error) {
    return {
      success: false,
      error: 'API request failed',
    };
  }
}

async function pollPrediction(predictionId: string) {
  // Poll until prediction is complete
  while (true) {
    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${predictionId}`,
      {
        headers: {
          'Authorization': 'Token YOUR_REPLICATE_API_TOKEN',
        },
      }
    );
    const prediction = await response.json();
    
    if (prediction.status === 'succeeded') {
      return prediction;
    } else if (prediction.status === 'failed') {
      throw new Error('Prediction failed');
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
```

### Option 2: Hugging Face Inference API

**Step 1:** Sign up at [huggingface.co](https://huggingface.co)

**Step 2:** Get API token from settings

**Step 3:** Replace mock API:

```typescript
export async function generateVirtualTryOn(
  request: TryOnRequest
): Promise<TryOnResponse> {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/YOUR_MODEL',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_HUGGINGFACE_TOKEN',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          person_image: request.userImage,
          garment_image: request.outfitImage,
        },
      }),
    }
  );

  const blob = await response.blob();
  const resultImage = URL.createObjectURL(blob);

  return {
    success: true,
    resultImage,
  };
}
```

### Option 3: Fashion-Specific APIs

Several fashion tech companies offer virtual try-on APIs:

- **Vue.ai** - Fashion-specific AI platform
- **Veesual** - Virtual try-on for fashion
- **Fit Analytics** - Size and fit recommendations
- **Sizefox** - AI sizing and virtual fitting

Contact these providers directly for API access and pricing.

## Best Practices

### 1. Environment Variables
Never commit API keys to your code. Use environment variables:

```typescript
const API_KEY = import.meta.env.VITE_REPLICATE_API_KEY;
```

### 2. Image Optimization
Compress images before sending to API:

```typescript
async function compressImage(base64: string, maxWidth = 1024) {
  // Resize and compress image
  const img = new Image();
  img.src = base64;
  await img.decode();
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  const scale = Math.min(maxWidth / img.width, 1);
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;
  
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.8);
}
```

### 3. Rate Limiting
Implement rate limiting to prevent abuse:

```typescript
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds

export async function generateVirtualTryOn(request: TryOnRequest) {
  const now = Date.now();
  if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
    throw new Error('Please wait before trying another outfit');
  }
  lastRequestTime = now;
  
  // ... rest of API call
}
```

### 4. Error Handling
Always handle errors gracefully:

```typescript
try {
  const result = await generateVirtualTryOn(request);
  // Handle success
} catch (error) {
  if (error.message.includes('rate limit')) {
    toast.error('Too many requests. Please wait a moment.');
  } else if (error.message.includes('network')) {
    toast.error('Network error. Check your connection.');
  } else {
    toast.error('Something went wrong. Please try again.');
  }
}
```

## Cost Considerations

Most AI APIs charge per request:

- **Replicate**: ~$0.01-0.10 per image generation
- **Hugging Face**: Free tier available, then pay-per-use
- **Commercial APIs**: Contact for enterprise pricing

For production, consider:
- Caching results
- User limits (e.g., 5 try-ons per day for free users)
- Premium tier for unlimited access

## Testing

Test your API integration with these steps:

1. **Unit test** the API service with mock responses
2. **Integration test** with real API (small dataset)
3. **Load test** to ensure it handles concurrent users
4. **Error scenarios** - network failures, invalid images, rate limits

## Security

⚠️ **Important**: Never expose API keys in frontend code!

**Recommended architecture**:
```
User → Your Frontend → Your Backend API → Third-party AI API
```

Your backend should:
- Validate user requests
- Store API keys securely
- Implement authentication
- Apply rate limiting
- Log usage for billing

## Need Help?

- Check `/services/virtualTryOnApi.ts` for the current implementation
- API documentation: See provider's docs (Replicate, Hugging Face, etc.)
- Community support: Fashion AI Discord servers, Reddit r/MachineLearning

---

**Ready to go live?** Replace the mock implementation in `/services/virtualTryOnApi.ts` with your chosen API provider!
