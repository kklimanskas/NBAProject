import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
export class Player {
  @Prop({ required: true, unique: true })
  @ApiProperty({ description: 'The API ID of the player' })
  apiId: number = 0;

  @Prop({ required: true })
  @ApiProperty({ description: 'The first name of the player' })
  firstName: string = '';

  @Prop({ required: true })
  @ApiProperty({ description: 'The last name of the player' })
  lastName: string = '';

  @Prop()
  @ApiProperty({ description: 'The position of the player' })
  position: string = '';

  @Prop()
  @ApiProperty({ description: 'The height of the player' })
  height: string = '';

  @Prop()
  @ApiProperty({ description: 'The weight of the player' })
  weight: string = '';

  @Prop()
  @ApiProperty({ description: 'The jersey number of the player' })
  jerseyNumber: string = '';

  @Prop()
  @ApiProperty({ description: 'The college of the player' })
  college: string = '';

  @Prop()
  @ApiProperty({ description: 'The country of the player' })
  country: string = '';

  @Prop()
  @ApiProperty({ description: 'The draft year of the player' })
  draftYear: number = 0;

  @Prop()
  @ApiProperty({ description: 'The draft round of the player' })
  draftRound: number = 0;

  @Prop()
  @ApiProperty({ description: 'The draft number of the player' })
  draftNumber: number = 0;

  @Prop()
  @ApiProperty({ description: 'The team ID of the player' })
  team: number = 0;

  @Prop({ default: false })
  @ApiProperty({ description: 'Indicates whether the player is soft deleted', default: false })
  isDeleted: boolean = false;

  @Prop({ type: Date, default: null })
  @ApiProperty({ description: 'The date when the player was last updated', default: null })
  updatedAtDate: Date | null = null;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
