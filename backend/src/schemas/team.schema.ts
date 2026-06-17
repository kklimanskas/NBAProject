import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Team {
  @Prop({ required: true, unique: true })
  @ApiProperty({ description: 'The API ID of the team' })
  apiId: number = 0;

  @Prop({ required: true })
  @ApiProperty({ description: 'The name of the team' })
  name: string = '';

  @Prop({ required: true })
  @ApiProperty({ description: 'The full name of the team' })
  fullName: string = '';

  @Prop()
  @ApiProperty({ description: 'The abbreviation of the team' })
  abbreviation: string = '';

  @Prop()
  @ApiProperty({ description: 'The city of the team' })
  city: string = '';

  @Prop()
  @ApiProperty({ description: 'The conference of the team' })
  conference: string = '';

  @Prop()
  @ApiProperty({ description: 'The division of the team' })
  division: string = '';

  @Prop({ default: false })
  @ApiProperty({
    description: 'Indicates whether the team is soft deleted',
    default: false,
  })
  isDeleted: boolean = false;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
