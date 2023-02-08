function createSql(key, query, isFilter, isNot, alterKey) {
    if (typeof query[key] !== 'string') { //CHECK IF QUERY.KEY DUPLICATE (user?id=2&id=3)
        for (let i in query[key]) { //LOOP ALL VALUE IN THE KEY (THE KEY IS ARRAY)
            return `${isFilter || isNot ? alterKey : key} ${isFilter ? 'REGEXP' : (isNot ? '<>' : '=')} '${query[key][i]}' ${isNot ? 'AND' : 'OR'} `
        }
    } else {
        return `${isFilter || isNot ? alterKey : key} ${isFilter ? 'REGEXP' : (isNot ? '<>' : '=')} '${query[key]}' ${isNot ? 'AND' : 'OR'} `
    }
}

function queryWhere(sql, query) {
    sql += " WHERE "
    let sqlTail = " AND "; //Tail of the sql query
    for (let key in query) { //Loop all key+value in query
        let isFilter = false;
        let isNot = false;
        let alterKey = "";
        if (key.includes("_like")) { //Filter if data match value
            isFilter = true;
            alterKey = key.slice(0, key.length - 5);
        }
        if (key.includes("_ne")) { //Data exclude a value
            isNot = true;
            alterKey = key.slice(0, key.length - 3);
            sqlTail += createSql(key, query, isFilter, isNot, alterKey)
        }
        if (key !== "_page" && key !== "_limit" && key !== "_start" && key !== "_end" && key !== "_sort" && key !== "_order" && !key.includes("_ne")) { //DONT USE LIMIT QUERY & SORT & EXCLUSION
            sql += createSql(key, query, isFilter, isNot, alterKey)
        }
    }
    sql = sql.slice(0, sql.length - 4)
    sqlTail = sqlTail.slice(0, sqlTail.length - 5)
    if (sqlTail.length > 5) sql += sqlTail
    return sql;
}

function querySort(sql, query) {
    let sort = query._sort;
    let order = query._order
    if (sort || order) {
        if (order) {
            let arr1 = order.split(",");
            let arr2 = sort.split(",");
            arr1.forEach((value, index) => {
                arr2[index] += ` ${value}` 
            });
            sort = arr2.join()
        }
        sql += ` ORDER BY ${sort}`
        return sql.replace(" WH ", " "); //REMOVE WH IN (SELECT * FROM user WH LIMIT 2,2)
    } else {
        return sql
    }
}

function queryLimit(sql, query) {
    let page = query._page;
    let limit = query._limit;
    if (page || limit) {
        sql += ` LIMIT ${(page - 1) * (limit ? limit : 10)},${limit ? limit : 10}`
        return sql.replace(" WH ", " "); //REMOVE WH IN (SELECT * FROM user WH LIMIT 2,2)
    } else {
        return sql
    }
}

function queryStartEnd(sql, query) {
    let start = query._start * 1;
    let end = query._end * 1;
    if (start || end) {
        sql += ` LIMIT ${start ? start : 0}, ${end ? end - (start ? start : 0) : 9999999999999999999}`
        return sql.replace(" WH ", " "); //REMOVE WH IN (SELECT * FROM user WH LIMIT 2,2)
    } else {
        return sql
    }
}

module.exports = { queryWhere, queryLimit, queryStartEnd, querySort }