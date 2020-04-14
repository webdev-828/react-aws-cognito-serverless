import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import UrlImage from '../../common/UrlImage';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  media: {
    height: 140,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ADMISSIONS = [
  ['Admission rate', 'latest.admissions.admission_rate.overall'],
  [
    '25th percentile of SAT scores(critical reading)',
    'latest.admissions.sat_scores.25th_percentile.critical_reading',
  ],
  [
    '75th percentile of SAT scores(critical reading)',
    'latest.admissions.sat_scores.75th_percentile.critical_reading',
  ],
  [
    '25th percentile of SAT scores(math)',
    'latest.admissions.sat_scores.25th_percentile.math',
  ],
  [
    '75th percentile of SAT scores(math)',
    'latest.admissions.sat_scores.75th_percentile.math',
  ],
  [
    '25th percentile of SAT scores(writing)',
    'latest.admissions.sat_scores.25th_percentile.writing',
  ],
  [
    '75th percentile of SAT scores(writing)',
    'latest.admissions.sat_scores.75th_percentile.writing',
  ],
  [
    'Midpoint of SAT scores at the institution (critical reading)',
    'latest.admissions.sat_scores.midpoint.critical_reading',
  ],
  [
    'Midpoint of SAT scores at the institution (math)',
    'latest.admissions.sat_scores.midpoint.math',
  ],
  [
    'Midpoint of SAT scores at the institution (writing)',
    'latest.admissions.sat_scores.midpoint.writing',
  ],
  [
    '25th percentile of the ACT cumulative score',
    'latest.admissions.act_scores.25th_percentile.cumulative',
  ],
  [
    '75th percentile of the ACT cumulative score',
    'latest.admissions.act_scores.75th_percentile.cumulative',
  ],
  [
    '25th percentile of the ACT English score',
    'latest.admissions.act_scores.25th_percentile.english',
  ],
  [
    '75th percentile of the ACT English score',
    'latest.admissions.act_scores.75th_percentile.english',
  ],
  [
    '25th percentile of the ACT math score',
    'latest.admissions.act_scores.25th_percentile.math',
  ],
  [
    '75th percentile of the ACT math score',
    'latest.admissions.act_scores.75th_percentile.math',
  ],
  [
    '25th percentile of the ACT writing score',
    'latest.admissions.act_scores.25th_percentile.writing',
  ],
  [
    '75th percentile of the ACT writing score',
    'latest.admissions.act_scores.75th_percentile.writing',
  ],
  [
    'Midpoint of the ACT cumulative score',
    'latest.admissions.act_scores.midpoint.cumulative',
  ],
  [
    'Midpoint of the ACT English score',
    'latest.admissions.act_scores.midpoint.english',
  ],
  [
    'Midpoint of the ACT math score',
    'latest.admissions.act_scores.midpoint.math',
  ],
  [
    'Midpoint of the ACT writing score',
    'latest.admissions.act_scores.midpoint.writing',
  ],
  [
    'Average SAT equivalent score of students admitted',
    'latest.admissions.sat_scores.average.overall',
  ],
];
const COST = [
  [
    'Average cost of attendance (academic year institutions)',
    'latest.cost.attendance.academic_year',
  ],
  [
    'Average cost of attendance (program-year institutions)',
    'latest.cost.attendance.program_year',
  ],
  ['In-state tuition and fees', 'latest.cost.tuition.in_state'],
  ['Out-of-state tuition and fees', 'latest.cost.tuition.out_of_state'],
  [
    'Tuition and fees for program-year institutions',
    'latest.cost.tuition.program_year',
  ],
];
const SCHOOL = [
  [
    "Highest degree awarded (0 Non-degree-granting 1 Certificate degree 2 Associate degree 3 Bachelor's degree 4 Graduate degree)",
    'school.degrees_awarded.highest',
  ],
  ['Number of branch campuses', 'school.branches'],
  ['Flag for main campus', 'school.main_campus'],
  ['Latitude', 'school.location.lat'],
  ['Longitude', 'school.location.lon'],
  ['Flag for men-only college', 'school.men_only'],
  ['Flag for women-only college', 'school.women_only'],
  ['Religous affiliation of the institution', 'school.religious_affiliation'],
  [
    'Net tuition revenue per full-time equivalent student',
    'school.tuition_revenue_per_fte',
  ],
  [
    'Instructional expenditures per full-time equivalent student',
    'school.instructional_expenditure_per_fte',
  ],
];
const STUDENT = [
  ['Number of graduate students', 'latest.student.grad_students'],
  [
    'The total share of enrollment of undergraduate degree-seeking students who are men',
    'latest.student.demographics.men',
  ],
  [
    'Total share of enrollment of undergraduate degree-seeking students who are women',
    'latest.student.demographics.women',
  ],
  [
    'First-time full-time student retention rate at four-year institutions',
    'latest.student.retention_rate.four_year.full_time_pooled',
  ],
  [
    'First-time part-time student retention rate at four-year institutions',
    'latest.student.retention_rate.four_year.part_time_pooled',
  ],
  ['Average age of entry', 'latest.student.demographics.age_entry'],
  [
    'Percent of students over 23 at entry',
    'latest.student.demographics.over_23_at_entry',
  ],
  ['Share of female students', 'latest.student.demographics.female_share'],
  [
    'Share of first-generation students',
    'latest.student.demographics.first_generation',
  ],
  [
    'Average family income in real 2015 dollars',
    'latest.student.demographics.avg_family_income',
  ],
];
const AID = [
  [
    'The median debt for students who have completed',
    'latest.aid.median_debt.completers.overall',
  ],
  [
    'The median debt for students who have not completed',
    'latest.aid.median_debt.noncompleters',
  ],
  [
    'Total share of enrollment of undergraduate degree-seeking students who are women',
    'latest.aid.demographics.women',
  ],
  [
    'First-time full-time student retention rate at four-year institutions',
    'latest.aid.retention_rate.four_year.full_time_pooled',
  ],
  [
    'First-time part-time student retention rate at four-year institutions',
    'latest.aid.retention_rate.four_year.part_time_pooled',
  ],
];

const School = ({ renderActions, collegeId }) => {
  const classes = useStyles();
  const [school, setSchool] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    API.get('api', `/college/${collegeId}`).then((data) => {
      setSchool(data);
      setLoading(false);
    });
  }, [collegeId]);

  return (
    <Card className="mb-3">
      {loading ? (
        <CircularProgress />
      ) : (
        school && (
          <React.Fragment>
            <a href={school['school.school_url']} target="_blank">
              <CardMedia
                style={{ objectFit: 'contain', width: '100%' }}
                component={UrlImage}
                url={school['school.school_url']}
              />
            </a>
            <CardContent>
              <Typography variant="h5">{school['school.name']}</Typography>
              <Typography className={classes.pos} color="textSecondary">
                {school['school.city']}, {school['school.state']}
              </Typography>
              <Typography variant="h6">Admission</Typography>
              <table className="table table-striped table-sm">
                <tbody>
                  {ADMISSIONS.map((i, idx) => (
                    <tr key={idx}>
                      <td>{i[0]}</td>
                      <td>{school[i[1]]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Typography variant="h6">Cost</Typography>
              <table className="table table-striped table-sm">
                <tbody>
                  {COST.map((i, idx) => (
                    <tr key={idx}>
                      <td>{i[0]}</td>
                      <td>{school[i[1]]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Typography variant="h6">School</Typography>
              <table className="table table-striped table-sm">
                <tbody>
                  {SCHOOL.map((i, idx) => (
                    <tr key={idx}>
                      <td>{i[0]}</td>
                      <td>{school[i[1]]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Typography variant="h6">Student</Typography>
              <table className="table table-striped table-sm">
                <tbody>
                  {STUDENT.map((i, idx) => (
                    <tr key={idx}>
                      <td>{i[0]}</td>
                      <td>{school[i[1]]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Typography variant="h6">Aid</Typography>
              <table className="table table-striped table-sm">
                <tbody>
                  {AID.map((i, idx) => (
                    <tr key={idx}>
                      <td>{i[0]}</td>
                      <td>{school[i[1]]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
            {renderActions && (
              <CardActions>{renderActions(collegeId)}</CardActions>
            )}
          </React.Fragment>
        )
      )}
    </Card>
  );
};

export default School;
