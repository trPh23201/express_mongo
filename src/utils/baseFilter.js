function baseFiler(query, reqQuery, _sort, _order, _page, _limit, _embed) {
  //Group all *OR OPERATOR* query
  if (Object.keys(reqQuery).length > 0) {
    query.where(function () {
      Object.keys(reqQuery).forEach((key) => {
        let alterKey = "";
        if (key && !key.includes("_")) {
          typeof reqQuery[key] === "string"
            ? this.orWhere(key, reqQuery[key])
            : reqQuery[key].forEach((value) => {
                this.orWhere(key, value);
              });
        }
        if (key.includes("_like")) {
          alterKey = key.slice(0, key.length - 5);
          typeof reqQuery[key] === "string"
            ? this.orWhere(alterKey, "ILIKE", `%${reqQuery[key]}%`)
            : reqQuery[key].forEach((value) => {
                this.orWhere(alterKey, "ILIKE", `%${value}%`);
              });
        }
      });
    });
  }

  //AND query
  Object.keys(reqQuery).forEach((key) => {
    if (key.includes("_ne")) {
      let alterKey = key.slice(0, key.length - 3);
      typeof reqQuery[key] === "string"
        ? query.andWhere(alterKey, "<>", reqQuery[key])
        : reqQuery[key].forEach((value) => {
            query.andWhere(alterKey, "<>", value);
          });
    }
  });
  //SORT
  if (_sort) {
    let sort = _sort;
    if (_order) {
      let arr1 = _order.split(",");
      let arr2 = _sort.split(",");
      arr1.forEach((value, index) => {
        arr2[index] += ` ${value}`;
      });
      sort = arr2.join();
    }
    query.orderByRaw(sort);
  } else {
    query.orderBy("id");
  }
  //Limit OffSet
  if (_page) {
    if (_limit) {
      query.page(+_page, +_limit);
    } else {
      query.page(+_page, 10);
    }
  }
  //Embed
  if (_embed) query.withGraphFetched(`[${_embed}]`);

  return query;
}
