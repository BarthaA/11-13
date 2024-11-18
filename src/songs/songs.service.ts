import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import * as mysql from 'mysql2/promise';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongsService {
  conn: mysql.Pool;
  DB: PrismaService;
  constructor(DB: PrismaService) {
    this.DB = DB;
  }

  async create(createSongDto: CreateSongDto) {
    return await this.DB.song.create({
      data: createSongDto
    });
  }

  async findAll() {
    return this.DB.song.findMany();
  }

  async findOne(id: number) {
    return this.DB.song.findUnique({
      where: { id },
    });
  }

  async findFree() {
    try {
      const result = await this.DB.song.findMany({
        where: { price: 0 },
      });
      return result.map((item) => ({
        id: item.id,
        title: item.title,
        artist: item.artist,
        duration: item.duration,
        price: item.price,
      }))
    } catch {
      return { message: 'Song not found' };
    }
  }

  async findPopularArtist() {
    const result = await this.DB.song.groupBy({
      by: ['artist'],
      _count: {
        artist: true,
      },
      orderBy: {
        _count: {
          artist: 'desc',
        },
      },
    });
    return result.map((item) => ({
      artist: item.artist,
      numberOfSongs: item._count.artist,
    }));
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    const updatedSong = await this.DB.song.update({
      where: { id },
      data: updateSongDto,
    });
    return updatedSong;
  }

  async remove(id: number) {
    try {
      await this.DB.song.delete({
        where: { id },
      });
    } catch {
      return { message: 'Song not found' };
    }
  }
}
