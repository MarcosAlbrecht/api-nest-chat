import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { ChatService } from './chat.service';
import { AcceptCallDto } from './dto/accept-call.dto';
import { CloseCallDto } from './dto/close-call.dto';
import { EnterChatDto } from './dto/enter-chat.dto';
import { LoginDto } from './dto/login.dto';

@WebSocketGateway({
  cors: {
    origin: '*', // Permite conexões de qualquer origem (ajuste conforme necessário)
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  // Conexão de um usuário
  handleConnection(@ConnectedSocket() client: Socket) {
    this.chatService.handleConnection(client);
  }

  // Desconexão de um usuário
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.chatService.handleDisconnect(client);
  }

  // Iniciar um novo chat
  @SubscribeMessage('startChat')
  handleStartChat(@ConnectedSocket() client: Socket) {
    this.chatService.startChat(client);
  }

  // Aceitar um chat
  @SubscribeMessage('accept-call')
  handleAcceptCall(
    @MessageBody() data: AcceptCallDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.chatService.acceptCall(client, data);
  }

  // Enviar uma mensagem
  @SubscribeMessage('message')
  handleSendMessage(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.chatService.sendMessage(client, data);
  }

  // Entrar em um chat como visualizador
  @SubscribeMessage('enter-call')
  handleEnterChat(
    @MessageBody() data: EnterChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.chatService.enterChat(client, data);
  }

  // Sair de um chat
  @SubscribeMessage('leave-call')
  handleLeaveChat(
    @MessageBody() data: EnterChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.chatService.leaveChat(client, data);
  }

  // Fechar um chat
  @SubscribeMessage('closeCall')
  handleCloseCall(
    @MessageBody() data: CloseCallDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.chatService.closeCall(client, data);
  }

  // Login de um usuário
  @SubscribeMessage('login')
  handleLogin(
    @MessageBody() data: LoginDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.chatService.handleLogin(client, data);
  }
}
