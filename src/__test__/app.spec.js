import { handleClick } from "../client/js/app";
import{expect} from '@jest/globals'


describe('Testing the submit functionality', ()=>{

    test('Testing the handleClick() function', ()=>{

        expect(handleClick).toBeDefined();
    })
})