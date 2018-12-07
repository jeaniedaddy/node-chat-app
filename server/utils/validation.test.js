var expect = require('expect');
var { isRealString } = require('./validation');


describe('IsRealString', ()=>{
    it('should return true for string ', ()=>{
        var a = ' a a '; 
        var res = isRealString(a);
        expect(res).toBe(true);
    });

    it('should return false for number ', ()=>{
        var a = 3; 
        var res = isRealString(a);
        expect(res).toBe(false);
    });

    it('should return false for just spaces ', ()=>{
        var a = '  '; 
        var res = isRealString(a);
        expect(res).toBe(false);
    });

    it('should return false for 0 lenth string',()=>{
        var a = '';
        var res = isRealString(a);
        expect(res).toBe(false);
    });
});