import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [SongsModule, PlaylistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
