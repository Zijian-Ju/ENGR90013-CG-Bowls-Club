package com.cg.backend.service;

import com.cg.backend.dao.CompetitionMapper;
import com.cg.backend.model.Competition;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("competitionService")
@Slf4j
public class CompetitionService {

    @Resource
    private CompetitionMapper competitionMapper;

    public void addCompetition(Competition competition) {
        competitionMapper.insert(competition);
    }

    public List<Competition> getAllCompetition() {
        return competitionMapper.selectAll();
    }

    public void updateCompetition(Competition competition) {
        competitionMapper.updateByPrimaryKey(competition);
    }

    public Competition getCompetitionById(Competition competition) {
        return competitionMapper.selectByPrimaryKey(competition);

    }

    public void deleteCompetitionById(Competition competition) {
        competitionMapper.deleteByPrimaryKey(competition);
    }
}
