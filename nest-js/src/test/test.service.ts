import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import {Test} from '../entities/test.entity';

@Injectable()
export class TestService {
    private test: Test[] = [
        {id: 0, name: 'Jun'}, 
        {id: 1, name: 'Sam'}, 
        {id: 2, name: 'Ken'}];

    findAll(name?: string): Test[]{
        if(name){
            return this.test.filter(test => test.name === name);
        }
        return this.test;
    }
    findById(testId: number): Test{
        return this.test.find(test => test.id === testId);
    }

    createTest(createTestDto: CreateTestDto): Test{
        const newTest = {id: Date.now(), ...createTestDto};

        this.test.push(newTest);

        return newTest;
    }
}
