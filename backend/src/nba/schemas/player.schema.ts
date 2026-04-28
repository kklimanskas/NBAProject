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
  teamName: string = '';
}

export const PlayerSchema = SchemaFactory.createForClass(Player);