'use strict';

module.exports.addSlashToEnd = (path) => {
    if (!path)
        throw Error('path could not be empty!');
    
    const length  = path.length - 1;
    const isSlash = path[length] === '/';
    
    if (isSlash)
        return path;
    
    return `${path}/`;
};

/** Функция получает короткие размеры
 * конвертируя байт в килобайты, мегабойты,
 * гигайбайты и терабайты
 * @pSize - размер в байтах
 */
module.exports.size = (size) => {
    const isNumber = typeof size === 'number';
    
    const l1KB = 1024;
    const l1MB = l1KB * l1KB;
    const l1GB = l1MB * l1KB;
    const l1TB = l1GB * l1KB;
    const l1PB = l1TB * l1KB;
    
    if (!isNumber)
        return size;
        
    if (size < l1KB)
        return size + 'b';
    
    if (size < l1MB)
        return (size / l1KB).toFixed(2) + 'kb';
    
    if (size < l1GB)
        return (size / l1MB).toFixed(2) + 'mb';
    
    if (size < l1TB)
        return (size / l1GB).toFixed(2) + 'gb';
    
    if (size < l1PB)
        return (size / l1TB).toFixed(2) + 'tb';
    
    return (size / l1PB).toFixed(2) + 'pb';
};

/**
 * Функция переводит права из цыфрового вида в символьный
 * @param perms - строка с правами доступа
 * к файлу в 8-миричной системе
 */
module.exports.permissions = {};
module.exports.permissions.symbolic = (perms) => {
    const is = typeof perms !== 'undefined';
    let permissions = '';
    /*
        S_IRUSR   0000400   protection: readable by owner
        S_IWUSR   0000200   writable by owner
        S_IXUSR   0000100   executable by owner
        S_IRGRP   0000040   readable by group
        S_IWGRP   0000020   writable by group
        S_IXGRP   0000010   executable by group
        S_IROTH   0000004   readable by all
        S_IWOTH   0000002   writable by all
        S_IXOTH   0000001   executable by all
    */
    
    if (!is)
        return permissions;
    
    const permsStr = perms.slice(-3);
    
    /* Переводим в двоичную систему */
    const owner = (permsStr[0] - 0).toString(2);
    const group = (permsStr[1] - 0).toString(2);
    const all   = (permsStr[2] - 0).toString(2);
    
    /* переводим в символьную систему*/
    permissions =
                 (owner[0] - 0 > 0 ? 'r' : '-')     +
                 (owner[1] - 0 > 0 ? 'w' : '-')     +
                 (owner[2] - 0 > 0 ? 'x' : '-')     +
                 ' '                                +
                 (group[0] - 0 > 0 ? 'r' : '-')     +
                 (group[1] - 0 > 0 ? 'w' : '-')     +
                 (group[2] - 0 > 0 ? 'x' : '-')     +
                 ' '                                +
                 (all[0] - 0   > 0 ? 'r' : '-')     +
                 (all[1] - 0   > 0 ? 'w' : '-')     +
                 (all[2] - 0   > 0 ? 'x' : '-');
    
    return permissions;
};

/**
 * Функция конвертирует права доступа к файлам из символьного вида
 * в цыфровой
 */
module.exports.permissions.numeric = (perms) => {
    const length = perms && perms.length === 11;
    
    if (!length)
        throw Error('permissions should be in format "xxx xxx xxx"');
    
    const R = 4;
    const W = 2;
    const X = 1;
    const N = 0;
    
    const owner =
        (perms[0]  === 'r' ? R : N) +
        (perms[1]  === 'w' ? W : N) +
        (perms[2]  === 'x' ? X : N);
    
    const group =
        (perms[4]  === 'r' ? R : N) +
        (perms[5]  === 'w' ? W : N) +
        (perms[6]  === 'x' ? X : N);
     
    const all =
        (perms[8]  === 'r' ? R : N) +
        (perms[9]  === 'w' ? W : N) +
        (perms[10] === 'x' ? X : N);
    
    /* добавляем 2 цифры до 5 */
    return '00' + owner + group + all;
};

