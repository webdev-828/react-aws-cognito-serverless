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

const Scholarship = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.implementation[5].url, '');
    const prev = props.implementation[4].url;
    const next = props.implementation[6].url;

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
                    <h2 className = 'center'>7.6 Scholarship exploration</h2>
                    <h3 className = 'center'>(90 min)</h3>
                </div>
            </div>
            <div className = 'center'>
                <div className = 'p-60'>
                    <p>
                        Winning free money is always helpful to your family no matter what financial situation you’re in! 
                        Your guardian(s) may tell you that they are fully responsible financing your college, but at the very minimum you should submit the FAFSA. 
                        Besides, you should still know what is going on behind the scenes. 
                        Learn about the overall picture of scholarships using this worksheet and prepare for any action that may be required in the near future.
                    </p>
                    <div className = 'line'></div>
                    <p className = 'mt-5'>
                        1. Read <a href = '#'>this article</a> to get equipped with a basic understanding of financial aid.
                    </p>
                    <p className = 'mt-5'>
                        2. Share your latest college list with your guardian(s). 
                        Encourage them to talk to our WeAdmit financial aid expert. 
                        We provide your family with four 30-min complimentary consultation meeting credits. 
                        Please let our admin team know directly or via LC as soon as your guardian(s) are ready to talk to them.
                    </p>
                    <p className = 'mt-5'>
                        3. If you are a U.S. citizen or permanent resident, you should definitely fill out the FAFSA form. 
                        The WeAdmit admin team may give you the latest video via Slack, but otherwise, watch <a href = '#'>this video</a> and be prepared to submit this form. 
                        FAFSA opens October 1st of your senior year. 
                        You should apply as soon as you can to get results quickly (the later you apply, the longer the wait!) 
                        Regarding the latest time to submit the form, if you apply to EA/ED round, you should submit FAFSA at the latest right before you submit your EA/ED applications. 
                        If you’re applying Regular Admissions only, you should apply as soon as possible, and definitely before you submit all of your applications. 
                        However, again, you should submit the form as soon as it opens on 10/1. 
                        Also, meet with your school counselor or college advisor at your high school and seek their advice for anything you should know about your high school/state.
                    </p>
                    <p className = 'mt-5'>
                        4. Review 
                        <Linkto to = {`${props.pathname}/${props.worksheets[5].worksheet_url}/${props.college[4].url}`} value = ' worksheets 6.5'/> and <Linkto to = {`${props.pathname}/${props.worksheets[5].worksheet_url}`} value = ' worksheets 6.a'/>. If any colleges on your final college list require the CSS profile to be eligible for certain scholarships, watch <a href = '#'>this video</a> and be prepared to submit this form. 
                        Check each school’s website and take note of the deadline.
                    </p>
                    <p className = 'mt-5'>
                        5. Explore scholarship opportunities using spreadsheet 7.c. Using the following tools, but not limited to just them, list whatever scholarships that you believe you have a good chance of winning. 
                        The recommended time commitment is 25 min and no more than 60 min at this time. 
                    </p>
                    <p><Href href = 'https://www.fastweb.com/college-scholarships' /></p>
                    <p><Href href = 'https://www.scholarships.com/' /></p>
                    <p><Href href = 'https://www.cappex.com/scholarships' /></p>
                    <p><Href href = 'https://scholarshipowl.com/' /></p>
                    <p className = 'mt-5'>
                        Tips: Generally speaking, nationally renowned scholarships are very competitive and it barely makes sense to apply to them. 
                        We recommend finding a good combination of multiple local or small-to-medium-sized scholarships. 
                        Unlike highly selective scholarships such as the Coca-Cola Scholars Program, these moderate scholarships doesn’t require as much work (usually just basic info and a short essay) while chances to win are reasonably high due to a small number of applicants. 
                        Rather than betting your energy on an all-or-nothing game with big-name scholarships, it is often wise to build a scholarship portfolio with lots of smaller (both by popularity and monetary amount) scholarships while also investing less effort.
                    </p>
                    <p className = 'mt-5'>
                        6. Go to <a href = '#'>Raise.Me</a> and create an account. 
                        Then, review worksheet 6.5 and find out if the schools you’re applying to have a partnership with Raise.Me. 
                        If they do, follow these schools and add your achievements to Raise.Me so that you may earn scholarships relatively easily.
                    </p>
                    <p className = 'mt-5'>
                        7. Talk to your guardian(s) from time to time. 
                        Financials are obviously very family-specific, so you should sync up with them to be aware of the situation.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Scholarship;