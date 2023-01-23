import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      return await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(id: number) {
    const pokemon = await this.pokemonModel.findOne({ no: id });
    if (!pokemon) throw new NotFoundException();
    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    try {
      return this.pokemonModel.findOneAndUpdate({ no: id }, updatePokemonDto, {
        new: true,
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: number) {
    const pokemon = await this.pokemonModel.findOneAndRemove({ no: id });
    if (!pokemon) {
      throw new NotFoundException();
    }
    return;
  }

  private handleException(error: any) {
    if (error.code === 1100) {
      throw new BadRequestException('Pokemon already exists');
    } else throw new InternalServerErrorException();
  }
}
