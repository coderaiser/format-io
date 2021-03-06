'use strict';

const tryCatch = require('try-catch');

const test = require('supertape');
const {
    size,
    addSlashToEnd,
    permissions,
} = require('..');

test('format: addSlashToEnd: no path', (t) => {
    const [error] = tryCatch(addSlashToEnd);
    t.equal(error.message, 'path could not be empty!', 'should throw');
    t.end();
});

test('format: addSlashToEnd: no slash', (t) => {
    const result = addSlashToEnd('hello');
    
    t.equal(result, 'hello/', 'should equal');
    t.end();
});

test('format: addSlashToEnd: slash', (t) => {
    const result = addSlashToEnd('hello/');
    
    t.equal(result, 'hello/', 'should equal');
    t.end();
});

test('format: size: not a number', (t) => {
    const result = size('-----');
    const expected = '-----';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('format: size: b', (t) => {
    const result = size(10 ** 3);
    const expected = '1000b';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('format: size: kb', (t) => {
    const result = size(10 ** 4);
    const expected = '9.77kb';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('format: size: mb', (t) => {
    const result = size(10 ** 7);
    const expected = '9.54mb';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('format: size: gb', (t) => {
    const result = size(10 ** 10);
    const expected = '9.31gb';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('format: size: tb', (t) => {
    const result = size(10 ** 13);
    const expected = '9.09tb';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('format: size: pb', (t) => {
    const result = size(10 ** 16);
    const expected = '8.88pb';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('format: permissions: symbolic', (t) => {
    const perm = ((16_894)).toString(8);
    const result = permissions.symbolic(perm);
    const expected = 'rwx rwx rw-';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('format: permissions: symbolic: no args', (t) => {
    const result = permissions.symbolic();
    const expected = '';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('format: permissions: numeric', (t) => {
    const result = permissions.numeric('rwx rwx rwx');
    const expected = '00777';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('format: permissions: numeric: wrong format', (t) => {
    const [error] = tryCatch(permissions.numeric);
    t.equal(error.message, 'permissions should be in format "xxx xxx xxx"', 'should equal');
    t.end();
});

test('format: permissions: numeric: r-- r-- r--', (t) => {
    const result = permissions.numeric('r-- r-- r--');
    const expected = '00444';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('format: permissions: numeric: --- --- ---', (t) => {
    const result = permissions.numeric('--- --- ---');
    const expected = '00000';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

