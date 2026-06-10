import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
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
  height: string = '';

  @Prop()
  weight: string = '';

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

  @Prop({ type: Date, default: null })
  updatedAtDate: Date | null = null;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
