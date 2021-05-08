package com.cg.backend.common.utils;

import com.cg.backend.common.enums.ResponseCode;
import lombok.Data;
import org.slf4j.LoggerFactory;

@Data
public class Result<T> {
  private T data;
  private Paging paging;

  public T getData() {
    return data;
  }

  public Paging getPaging() {
    return paging;
  }

  public void setData(T data) {
    this.data = data;
  }

  public void setPaging(Paging paging) {
    this.paging = paging;
  }
}
