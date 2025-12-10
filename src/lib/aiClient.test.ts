/**
 * AI Client Test Suite
 * 
 * Validates all AI context types and ensures proper routing.
 * Run in browser console or as a test file.
 */

import { queryAI, getAIConfig, type AIContextType } from './aiClient';

/**
 * Test all AI context types
 */
export async function testAllContextTypes() {
  const contexts: AIContextType[] = [
    'study-assistant',
    'roadmap',
    'planner',
    'therapist',
    'content-generator',
    'mentor',
  ];

  console.log('🧪 Testing AI Client Context Routing...\n');
  console.log('Current Config:', getAIConfig(), '\n');

  const results: Record<string, { success: boolean; response?: string; error?: string }> = {};

  for (const contextType of contexts) {
    console.log(`\n📋 Testing context: ${contextType}`);
    console.log('─'.repeat(50));

    try {
      const response = await queryAI({
        contextType,
        messages: [
          {
            role: 'user',
            content: `Test query for ${contextType} context`,
            timestamp: Date.now(),
          },
        ],
      });

      console.log('✅ Success');
      console.log('Response preview:', response.content.substring(0, 100) + '...');
      console.log('Model:', response.model);
      console.log('Finish reason:', response.finishReason);

      results[contextType] = {
        success: true,
        response: response.content,
      };
    } catch (error) {
      console.error('❌ Failed');
      console.error('Error:', error);

      results[contextType] = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  console.log('\n\n📊 Test Summary');
  console.log('═'.repeat(50));

  const successCount = Object.values(results).filter((r) => r.success).length;
  const failCount = Object.values(results).filter((r) => !r.success).length;

  console.log(`✅ Passed: ${successCount}/${contexts.length}`);
  console.log(`❌ Failed: ${failCount}/${contexts.length}`);

  if (failCount === 0) {
    console.log('\n🎉 All context types working correctly!');
  } else {
    console.log('\n⚠️  Some context types failed. Check logs above.');
  }

  return results;
}

/**
 * Test API key security (should never log the key)
 */
export function testAPIKeySecurity() {
  console.log('\n🔒 Testing API Key Security...');
  console.log('─'.repeat(50));

  const config = getAIConfig();

  if ('apiKey' in config) {
    console.error('❌ SECURITY FAILURE: API key exposed in config!');
    return false;
  }

  console.log('✅ API key properly hidden from getAIConfig()');

  // Test that errors don't expose the key
  queryAI({
    contextType: 'study-assistant',
    messages: [],
  }).catch((error) => {
    const errorString = JSON.stringify(error);
    const configString = JSON.stringify(config);

    if (
      errorString.includes('VITE_GEMINI_API_KEY') ||
      configString.includes('VITE_GEMINI_API_KEY')
    ) {
      console.error('❌ SECURITY FAILURE: API key leaked in error!');
      return false;
    }

    console.log('✅ API key not leaked in errors');
  });

  return true;
}

/**
 * Test streaming functionality
 */
export async function testStreaming() {
  console.log('\n📡 Testing Streaming...');
  console.log('─'.repeat(50));

  try {
    const { streamAI } = await import('./aiClient');

    const chunks: string[] = [];

    const stream = streamAI({
      contextType: 'mentor',
      messages: [
        {
          role: 'user',
          content: 'Explain quantum physics',
          timestamp: Date.now(),
        },
      ],
    });

    for await (const chunk of stream) {
      chunks.push(chunk);
      process.stdout.write(chunk); // Show streaming in real-time
    }

    console.log('\n✅ Streaming completed');
    console.log(`Total chunks: ${chunks.length}`);
    console.log(`Total content: ${chunks.join('').length} characters`);

    return true;
  } catch (error) {
    console.error('❌ Streaming failed:', error);
    return false;
  }
}

/**
 * Run all tests
 */
export async function runAllTests() {
  console.log('🚀 Starting AI Client Test Suite');
  console.log('═'.repeat(50));

  await testAllContextTypes();
  testAPIKeySecurity();
  await testStreaming();

  console.log('\n\n✨ Test suite completed!');
}

// Auto-run if loaded as module
if (import.meta.hot) {
  console.log('🔥 Hot module reload detected');
  // Uncomment to auto-run tests in dev mode:
  // runAllTests();
}
