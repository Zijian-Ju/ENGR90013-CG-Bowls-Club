package com.cg.backend.common.utils;

import com.cg.backend.model.Player;
import lombok.Data;

@Data
public class SearchRequest<T> {
  private Player player;
  private Paging paging;

  public Player getPlayer() {
    return player;
  }

  public void setPlayer(Player player) {
    this.player = player;
  }

  public Paging getPaging() {
    return paging;
  }

  public void setPaging(Paging paging) {
    this.paging = paging;
  }
}
