package com.cg.backend.common.utils;

import com.cg.backend.model.Player;
import lombok.Data;

@Data
public class SearchRequest<T> {
  private T searching;
  private Paging paging;

  public T getSearching() {
    return searching;
  }

  public void setSearching(T searching) {
    this.searching = (T) searching;
  }

  public Paging getPaging() {
    return paging;
  }

  public void setPaging(Paging paging) {
    this.paging = paging;
  }
}