import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Player {
  @Prop({ required: true, unique: true })
  apiId: number = 0;

  @Prop({ required: true })
  firstName: string = '';

  @Prop({ required: true })
  lastName: string = '';

  @Prop()
  position: string = '';

  @Prop()
  jerseyNumber: string = '';

  @Prop()
  college: string = '';

  @Prop()
  country: string = '';

  @Prop()
  draftYear: number = 0;

  @Prop()
  draftRound: number = 0;

  @Prop()
  draftNumber: number = 0;

  @Prop({ type: Object })
  team: {
    id: number;
    name: string;
    fullName: string;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
  } = {
    id: 0,
    name: '',
    fullName: '',
    abbreviation: '',
    city: '',
    conference: '',
    division: '',
  };
}

export const PlayerSchema = SchemaFactory.createForClass(Player);