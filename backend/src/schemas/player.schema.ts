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

  @Prop()
  team: number = 0;

  @Prop({ default: false })
  isDeleted: boolean = false;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
