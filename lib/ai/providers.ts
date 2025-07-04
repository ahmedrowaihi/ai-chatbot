import { createFlowiseProvider } from '@ahmedrowaihi/flowise-vercel-ai-sdk-provider';
import { customProvider } from 'ai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

if (!process.env.FLOWISE_BASE_URL || !process.env.FLOWISE_API_KEY) {
  throw new Error('FLOWISE_BASE_URL and FLOWISE_API_KEY must be set');
}

if (!process.env.FLOWISE_CHAT_FLOW_ID) {
  throw new Error('FLOWISE_CHAT_FLOW_ID must be set');
}

if (!process.env.FLOWISE_CHAT_FLOW_ID) {
  throw new Error('FLOWISE_CHAT_FLOW_ID must be set');
}

const flowiseProvider = createFlowiseProvider({
  baseUrl: process.env.FLOWISE_BASE_URL,
  apiKey: process.env.FLOWISE_API_KEY,
});

const flowiseModel = flowiseProvider(process.env.FLOWISE_CHAT_FLOW_ID);

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({ languageModels: { 'chat-model': flowiseModel } });
