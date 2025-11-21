import OpenAI from 'openai';
import logger from '../utils/logger.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const systemPrompt = `You are a helpful AI assistant specialized in childhood vaccinations and pediatric healthcare. 
Your role is to provide accurate, evidence-based information about:
- Vaccination schedules
- Vaccine side effects
- Preparation for vaccinations
- General child health questions

Always:
- Be empathetic and understanding
- Provide clear, simple explanations
- Cite reputable sources (WHO, CDC) when possible
- Encourage consulting healthcare professionals for medical decisions
- Never provide emergency medical advice

If asked about emergencies or serious symptoms, immediately advise seeking medical attention.`;

export const chatWithAI = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({
        status: 'error',
        message: 'Message is required'
      });
    }

    // Build messages array
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Using a modern model
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    });

    const aiResponse = completion.choices[0].message.content;

    res.status(200).json({
      status: 'success',
      data: {
        message: aiResponse,
        conversationId: req.body.conversationId || Date.now().toString()
      }
    });

  } catch (error) {
    logger.error('AI Chat Error:', error);
    
    // Fallback response if OpenAI fails
    const fallbackResponse = `I'm having trouble connecting right now. For vaccine information, please consult:
    - Your pediatrician
    - WHO vaccine guidelines: https://www.who.int/immunization
    - CDC vaccine schedules: https://www.cdc.gov/vaccines
    
    For urgent concerns, please contact your healthcare provider.`;

    res.status(200).json({
      status: 'success',
      data: {
        message: fallbackResponse,
        fallback: true
      }
    });
  }
};

export const getAIConversationHistory = async (req, res) => {
  try {
    // In a production app, you would store conversation history in database
    // For now, return empty array
    res.status(200).json({
      status: 'success',
      data: {
        conversations: []
      }
    });

  } catch (error) {
    logger.error('Get AI History Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const submitAIFeedback = async (req, res) => {
  try {
    const { messageId, helpful } = req.body;

    // Log feedback for analysis
    logger.info('AI Feedback:', {
      userId: req.user._id,
      messageId,
      helpful,
      timestamp: new Date()
    });

    res.status(200).json({
      status: 'success',
      message: 'Feedback submitted successfully'
    });

  } catch (error) {
    logger.error('Submit AI Feedback Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
