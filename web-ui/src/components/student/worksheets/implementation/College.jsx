import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import Wrapper from './../../../ui/wrapper/Wrapper';
import Comment from './../../../ui/comment/Comment';
import Textfield from './../../../ui/textfield/Textfield';
import Linkto from './../../../ui/linkto/Linkto';
import Href from './../../../ui/href/Href';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    icon: {
        fontSize: '3rem',
        color: 'grey'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    table: {
        fontSize: '1rem'
    },
    tablecell: {
        padding: '2%',
        fontSize: '1rem',
        backgroundColor: 'lightgrey',
        border: 'solid',
        borderWidth: '1px'
    },
    tablecell1: {
        border: 'solid',
        borderWidth: '1px'
    },
    tablecell2: {
        border: 'solid',
        borderWidth: '1px',
        width: '60%'
    },
    textfield: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    },
    label: {
        fontWeight: 'bold'
    },
    input: {
        border: 0,
        outline: 0,
        background: 'transparent',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1
    }
}));

const College = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.implementation[6].url, '');
    const prev = props.implementation[5].url;
    const next = props.implementation[7].url;

    return (
        <div>
            <div className = 'center direction'>
                <Link to = {`${root}${prev}`} style = {{textDecoration: 'none'}}>
                    <FastRewindRoundedIcon className = {classes.icon} style = {{marginLeft: '5rem'}} />
                </Link>
                <Link to = {`${root}${next}`} style = {{textDecoration: 'none'}}>
                    <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                </Link>
            </div>
            <div className = 'center'>
                <div style = {{width: '80%', textAlign: 'center'}}>
                    <h2 className = 'center'>7.7 College Application 101</h2>
                    <h3 className = 'center'>(45 min)</h3>
                </div>
            </div>
            <div className = 'center'>
                <div className = 'p-60'>
                    <p>
                        College apps are tough. 
                        There are so many small things that you need to get right that it’s easy to lose track of them until it’s too late. 
                        This worksheet serves as more of a reference document for you to read over now and refer to whenever it’s relevant or you need it! 
                        Read over this once in completion so you have a good basis of knowledge.
                    </p>
                    <div className = 'line'></div>
                    <p>
                        Early Admissions:
                    </p>
                    <p style = {{textIndent: 30, marginTop: -15}}>
                        Applying early is a great way to make your application stand out and possibly get your entire process over with quickly. 
                        There are two main types of early admissions:
                    </p>
                    <ul>
                        <li>
                            Early Action (EA)
                            <ol type = 'a'>
                                <li>
                                    This is the same exact thing as regular admissions except the timetable is moved up. 
                                    You can apply to as many schools as you want, and the decision is non-binding.
                                </li>
                                <li>
                                    Some schools (such as Stanford, Harvard, Princeton, and more) offer Restrictive Early Action (REA) which is more similar to Early Decision (below) but still lets you apply to select schools according to each school’s policy. 
                                    For example, Harvard allows you to apply REA and still apply to in-state public schools.
                                </li>
                            </ol>
                        </li>
                        <li>
                            Early Decision (ED)
                            <ol type = 'a'>
                                <li>
                                    This is a binding application - if you get in, you MUST go. 
                                    Thus, you can only apply to one school using Early Decision. 
                                    This should be reserved for your dream school since you can only pick one school and you should use that shot on the school that would make you happiest. 
                                </li>
                            </ol>
                        </li>
                        <li>
                            EA vs ED vs REA
                            <ol type = 'a'>
                                <li>Check out <a href = '#'>this article</a></li>
                            </ol>
                        </li>
                    </ul>
                    <p>
                        Deadline:
                    </p>
                    <p style = {{textIndent: 30, marginTop: -15}}>
                        College applications come with tons of deadlines. 
                        Submitting letters of recommendation, submitting essays and applications, etc. 
                        It can be hard to manage all of them and remember them all! Here are some of the most popular deadlines 
                        (not an extensive list, you should make your own!)
                    </p>
                    <ol type = '1'>
                        <li>Common App Opens: 8/1</li>
                        <li>FAFSA Opens: 10/1</li>
                        <li>Earliest EA/ED deadlines: 10/15</li>
                        <li>Most EA/ED deadlines: 11/1 or 11/15</li>
                        <li>Most Regular Decisions deadlines: 12/31 +- 1 week</li>
                        <li>Most EA/ED decisions: 12/15 +- 2 weeks</li>
                        <li>Most Regular Decisions: 4/1 +- 3 weeks</li>
                    </ol>
                    <p>
                        Common App:
                    </p>
                    <p style = {{textIndent: 30, marginTop: -15}}>
                        The Common Application website is where you’ll be spending most of your time (besides Google Docs writing your essays) throughout your college applications. 
                        Here is a detailed tutorial for how to navigate the website:
                    </p>
                    <p className = 'center' style = {{marginTop: 0}}><Href href = 'https://www.youtube.com/watch?v=JiIvfXiiCHo'/></p>
                    <p>
                        GPA/Transcript:
                    </p>
                    <p style = {{textIndent: 30, marginTop: -15}}>
                        While GPA does matter, it varies vastly from high school to high school. 
                        Thus, it’s important that you try your best and stand out from your classmates - a 4.0 from one school may be just as impressive as a 3.0 at another. 
                        Here are some helpful tools:
                    </p>
                    <ul>
                        <li>
                            GPA Calculator:
                            <ul>
                                <li><Href href = 'https://gpacalculator.net/high-school-gpa-calculator/'/></li>
                            </ul>
                        </li>
                        <li>
                            Unversity of California GPA Calculator:
                            <ul>
                                <li><Href href = 'https://rogerhub.com/gpa-calculator-uc/'/></li>
                            </ul>
                        </li>
                        <li>
                            Here's a good article about GPA and admissions:
                            <ul>
                                <li><Href href = 'https://www.petersons.com/blog/college-admission-requirements-and-your-gpa/'/></li>
                            </ul>
                        </li>
                        <li>
                            Sending your transcript:
                            <ul>
                                <li>
                                    This isn’t your job - it’s your school’s. 
                                    However, you need to inform your school college office of which schools they need to send transcripts to according to their own deadlines. 
                                    If you’re unsure of when that deadline is, ask your counselor - don’t just wait until it’s too late! Also, consult each college’s website for deadlines they may have set.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p>
                        Test Scores (SAT, ACT):
                    </p>
                    <p style = {{textIndent: 30, marginTop: -15}}>
                        Unlike GPA, test scores are standardized and thus can be used to rank students on an international scale. 
                        Therefore, it’s super important to get the highest score you can. For most schools, >=1400 on SAT or >= 32 on ACT is great.
                    </p>
                    <ul>
                        <li>
                            SAT/ACT ranges for most schools:
                            <ul>
                                <li><Href href = 'https://www.compassprep.com/college-profiles-new-sat/'/></li>
                            </ul>
                        </li>
                        <li>
                            SAT/ACT Strategy
                            <ul>
                                <li><Href href = 'https://www.collegecovered.com/resources-for-counselors/tools-tricks-sat-act/'/></li>
                            </ul>
                        </li>
                        <li>
                            SAT/ACT Books
                            <ul>
                                <li>Ask your LC and look at {props.type === 'lc' && <Linkto to = {`/lcstudents/${props.worksheets[6].worksheet_url}/${props.implementation[1].url}`} value = 'worksheet 7.2' />}{props.type === 'student' && <Linkto to = {`/worksheet/${props.worksheets[6].worksheet_url}/${props.implementation[1].url}`} value = 'worksheet 7.2' />}!</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default College;