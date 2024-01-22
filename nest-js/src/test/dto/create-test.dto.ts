;import { ApiProperty } from "@nestjs/swagger";

export class CreateTestDto{
    @ApiProperty()
    name: string

    // @ApiProperty({required: false})
    // age?: number;
}