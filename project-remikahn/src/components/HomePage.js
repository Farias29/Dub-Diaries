import { prodErrorMap } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import ENTRY_DATA from '../data/entries.json';
import PROMPTS from '../data/prompts.json';

function RandomPrompt(props) {

    const changePrompt = props.changePrompt;
    const promptArr = props.promptArr;
    const promptIndex = props.promptIndex;
    console.log(promptIndex);
    const [typedValue, setTypedValue] = useState("");

    const promptText = (promptArr[promptIndex]).prompt;


    const handleTypedChange = (event) => {
        const inputtedTypedValue = event.target.value;
        setTypedValue(inputtedTypedValue); //update state and re-render!
    }

    return (
       <div className="container col-12">
        <div className="d-flex row py-5">
            <h2 className="highlight"><strong>😭 Stuck on what to write about?</strong></h2>
            <div className="col-md-6">
                <p>If you're in need of journal inspiration, start your thinking process with one of these prompts!</p>
                <p>Click on the prompt text to get a new one ⬇️ </p>
                <div onClick={changePrompt}>
                    <h3>{promptText}</h3>
                </div>
                {/* <button className="btn btn-outline-dark" onClick={changePrompt}>Click for new prompt</button> */}
            </div>
            <div className="col-md-6">
                <p>Start brainstorming here and finish it in your journal!</p>
                <textarea className="journalText textbox" id="user-prompt-text" type="textbox" placeholder="Start typing..." style={{font: "Open Sans"}} name="entry-date" onChange={handleTypedChange}></textarea>
            </div>
        </div>
       </div>
    );
}
 
export function HomeCard(props){
    const title = props.title;
    const date = props.date;
    const cta = "View entry →";
    const alt = props.alt;
    const mood = props.mood;
    const journal = props.journal;

    return (
        <div className="d-flex col-md-6 col-lg-4 px-4 py-3">
            <div className='card mb-4'>
                <div className="entry-card card-body">
                    <div className="col-sm-auto">
                        <img className="col-sm-12" id="homecardpic" src="/img/linesjourn.png" alt={alt}/>
                    </div>
                    <div className="col-sm">
                        <h2 className="card-title homeTitle">{title}</h2>
                        <p className="card-text homeDate">{date}</p>
                        <p><span className="badge rounded-pill text-light">{mood}</span>  
                         <span className="badge rounded-pill text-light">{journal}</span></p>
                        <Link to={title} className="btn btn-light">{cta}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HomeHero(props) {
    const heading1 = props.heading1;
    const desc2 = props.desc2;
    const prompt = props.prompt;
    const alt = props.alt;
    const image = props.image;

    return (
        <div className="col-12 the-thing-covering-nav">
          <div className="d-flex row py-5 the-thing-covering-nav">
            <div className="col-md-6">
              <div className="hero-desc">
                <h1 className="app-title">{heading1}</h1>
                <h3 className="app-desc">{desc2}</h3>
                <h4 className="app-q">{prompt}</h4>
              </div>
            </div>

            <div className="col-md-6">
              <img src={image} className="hero-image" alt={alt} loading="lazy"/>
            </div>
          </div>
        </div>
    );
}

function SubHeading(props) {
    const heading2 = props.heading2;
    return (
        <div className="d-flex px-4 py-4 justify-content-center">
            <h2>{heading2}</h2>
        </div>
    )
}

export function EntryCardList(props) {
    const entries = props.entries;
    const compArr = entries.map((entryObj, index) => {
        const element = (
            <HomeCard
                title={entryObj.title}
                date={entryObj.date}
                image={entryObj.image}
                alt={entryObj.alt}
                cta={entryObj.cta}
                mood={entryObj.mood}
                journal={entryObj.journal}
                key={index}
            />
        )
        return element;
    })

   return (
        <div id="class-cards" className="row">
            {compArr} 
        </div>
    )
}

export function HomePage(props){

    // Search Function
    const [stateData, setStateData] = useState(ENTRY_DATA);
    const [queryText, setQueryText] = useState('');
    console.log("state " + stateData);

    const handleChange = (event) => {
        setQueryText(event.target.value);
    }

    const handleSubmit = (event) => {
        let data = stateData;
        console.log("state 2 " + data);
        console.log("query " + queryText);

        if(queryText != '') {
            data = data.filter(entry => (entry.title).toLowerCase().includes(queryText) == true || 
                (entry.date).toLowerCase().includes(queryText) == true);
        } else if (queryText === '') {
            data = ENTRY_DATA;
        }

        console.log(data);
        setStateData(data);
        event.preventDefault();
    }

    // Prompt Picker
    let [promptIndex, setPromptIndex] = useState(0);
    const promptArr = props.promptArr;
    console.log("test");
    console.log(promptArr);


    const changePrompt = () => {
        if (promptIndex + 1 == promptArr.length) {
            promptIndex = -1;
        }
        setPromptIndex(promptIndex + 1);
    };


    const navigate = useNavigate();
    const toDiaryPage = () => {
        // navigate to: DiaryPage
        navigate('/DiaryPage');
    };

    console.log(promptIndex);

    return(
        <div className='container'> 

            <HomeHero heading1={'DubDiaries'} desc2={'Explore your inner self through journaling'} prompt={'What did you do today?'} image={'img/writingillus.svg'} alt={'journal and girl'} />
            <RandomPrompt promptArr={PROMPTS} promptIndex={promptIndex} changePrompt={changePrompt}/>
            <hr />
            <SubHeading heading2={'Recent Entries'} />
            <div>
                <form className="form-inline" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="searchQuery" className='mr-2'>Search Entries</label>
                        <input type="text" className="form-control" placeholder="Enter title or date"
                            value={queryText} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary ml-2">
                        Go
                    </button>

                </form>

                <button href="" className="btn btn-primary text-light mt-4" aria-label="add new entry" onClick={toDiaryPage}>Start a new entry!</button>
            </div>

            <div className="row">
                <EntryCardList entries={stateData}/>
            </div>
        </div>

    )
}
