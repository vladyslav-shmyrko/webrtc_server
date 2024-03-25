import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';

describe('ChatGateway', () => {
  let gateway: ChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
  });

  describe('sendCandidate', () => {
    it('should correctly emit candidate to all clients except sender', async () => {
      const emitMock = jest.fn();
      const exceptMock = jest.fn(() => ({ emit: emitMock }));
      const inMock = jest.fn(() => ({ except: exceptMock }));

      const mockClient: any = { id: '123', emit: jest.fn() };
      const mockServer = { in: inMock };

      gateway.server = mockServer as any;

      const candidate = 'someCandidate';
      const roomName = 'someRoom';
      await gateway.sendCandidate({ candidate, roomName }, mockClient as any);

      expect(inMock).toHaveBeenCalledWith(roomName);
      expect(exceptMock).toHaveBeenCalledWith(mockClient.id);
      expect(emitMock).toHaveBeenCalledWith('send_candidate', {
        candidate,
        roomName,
      });
    });
  });
});
