import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Team {
  @Prop({ required: true, unique: true })
  apiId: number = 0;

  @Prop({ required: true })
  name: string = '';

  @Prop({ required: true })
  fullName: string = '';

  @Prop()
  abbreviation: string = '';

  @Prop()
  city: string = '';

  @Prop()
  conference: string = '';

  @Prop()
  division: string = '';

  @Prop({ default: false })
  isDeleted: boolean = false;

}

export const TeamSchema = SchemaFactory.createForClass(Team);