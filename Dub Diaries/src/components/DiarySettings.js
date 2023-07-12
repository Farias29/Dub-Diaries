import React, { useState } from 'react';
import { getDatabase, ref as dbRef, set as firebaseSet, push as firebasePush} from 'firebase/database';

function GetColorSelector(props) {
    const textColorArr = props.textColorArr;
    const textColor = props.textColor;
    const setTextColor = props.setTextColor;
    const handleInputChange = props.handleInputChange;
    
    // array of colors
    const textColorOptions = textColorArr.map((color) => {
        return <option value={color.textColor} key={color.textColor}>{color.displayName}</option>
    });

    // sets the color
    const changeTextColor = (event) => {
        const textColor = event.target.value; // as string, "darkmagenta"
        document.getElementById("user-diary-text").style.color = textColor;
        setTextColor(event.target.value);
    }

    return (
        <li className='settingsListItem chooseYourFont mb-3'>
            <select id="input-font" className="input" value={textColor} onChange={changeTextColor} onSelect={handleInputChange}>
                {textColorOptions}
            </select>
        </li>
    );
}

function GetSizeSelector(props) {
    const sizeArr = props.sizeArr;
    const fontSize = props.fontSize;
    const setFontSize = props.setFontSize;
    const handleInputChange = props.handleInputChange;
    
    // array of sizes
    const sizeOptions = sizeArr.map((size) => {
        return <option value={size.fontSize} key={size.fontSize}>{size.displayName}</option>
    });

    // sets the size
    const changeFontSize = (event) => {
        const fontSize = event.target.value + "px"; // as int then string, "17px"
        document.getElementById("user-diary-text").style.fontSize = fontSize;
        setFontSize(event.target.value);
    }

    return (
        <li className='settingsListItem chooseYourFont mb-3'>
            <select id="input-font" className="input" value={fontSize} onChange={changeFontSize} onSelect={handleInputChange}>
                {sizeOptions}
            </select>
        </li>
    );
}

function GetFontSelector(props) {
    const fontArr = props.fontArr;
    const diaryFont = props.diaryFont;
    const setDiaryFont = props.setDiaryFont;
    const handleInputChange = props.handleInputChange;
    
    // array of fonts
    const fontOptions = fontArr.map((font) => {
        return <option value={font.fontName} key={font.fontName}>{font.displayName}</option>
    });

    // sets the font
    const changeUserFont = (event) => {
        const userFont = event.target.value; // as string, "fontName"
        document.getElementById("user-diary-text").style.fontFamily = userFont;
        setDiaryFont(event.target.value);
    }

    return (
        <li className='settingsListItem chooseYourFont mb-3'>
            <select id="input-font" className="input" value={diaryFont} onChange={changeUserFont} onSelect={handleInputChange}>
                {fontOptions}
            </select>
        </li>
    );
}

function GetMoodSelector(props) {
    const changeFillColor = props.changeFillColor;
    const colorArr = props.colorArr;
    const colorIndex = props.colorIndex;
    const handleInputChange = props.handleInputChange;

    const moodName = (colorArr[colorIndex]).mood + ".";
    const fillColor = (colorArr[colorIndex]).name;

    return (
        <li className='settingsListItem chooseYourMood'>
        <div className="moodBoxFlex mb-2">
            <div id="moodBox" onClick={changeFillColor} onChange={handleInputChange} style={{background: fillColor}}></div>
            <div className="moodBoxText">
                <p className='yourMoodIs'>Today, you're feeling pretty</p>
                <p className='theMood'>{moodName}</p>
            </div>
        </div>
        </li>
    );
}

export function DiarySettings(props) {
    const initialValues = {
        mood: "",
        color: "",
        size: "",
        font: ""
    };

    const [values, setValues] = useState(initialValues);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };

    // This sets the mood color on the diary page
    let [colorIndex, setColorIndex] = useState(0);
    const colorArr = props.colorArr;

    const changeFillColor = () => {
        if (colorIndex + 1 == colorArr.length) {
            colorIndex = -1;
        }
        setColorIndex(colorIndex + 1);
        // console.log(colorIndex);
    };

    const moodSelector = () => {
        return (
            <GetMoodSelector 
                changeFillColor={changeFillColor}
                colorArr={colorArr}
                colorIndex={colorIndex}
                handleInputChange={handleInputChange}
            />
        );
    }
    // end

    // This sets the user's dairy page font
    const fontArr = props.fontArr;
    const getInitialFont = () => {
        const value = "Basic";
        return value;
    }
    const [diaryFont, setDiaryFont] = useState(getInitialFont);

    const fontSelector = () => {
        return (
            <GetFontSelector 
                fontArr={fontArr}
                diaryFont={diaryFont}
                setDiaryFont={setDiaryFont}
                handleInputChange={handleInputChange}
            />
        );
    };
    // end

    // This sets the user's dairy text size
    const sizeArr = props.sizeArr;
    const getInitialSize = () => {
        const value = 17;
        return value;
    }
    const [fontSize, setFontSize] = useState(getInitialSize);

    const sizeSelector = () => {
        return (
            <GetSizeSelector 
                sizeArr={sizeArr}
                fontSize={fontSize}
                setFontSize={setFontSize}
                handleInputChange={handleInputChange}
            />
        );
    };
    // end

    // This sets the user's dairy text color
    const textColorArr = props.textColorArr;
    const getInitialColor = () => {
        const value = "black";
        return value;
    }
    const [textColor, setTextColor] = useState(getInitialColor);

    const colorSelector = () => {
        return (
            <GetColorSelector 
                textColorArr={textColorArr}
                textColor={textColor}
                setTextColor={setTextColor}
                handleInputChange={handleInputChange}
            />
        );
    };
    // end

    const addMessageCallback = props.addMessageCallback;
    let currentUser = props.currentUser;

    const handleSubmitChange = (event) => {
        const db = getDatabase();
        const refStringMood = values.mood;
        const refStringColor = values.color;
        const refStringSize = values.size;
        const refStringFont = values.font;

        const userMoodRef = dbRef(db, currentUser.userId+"/"+Date.now()+"/mood");
        const userColorRef = dbRef(db, currentUser.userId+"/"+Date.now()+"/color");
        const userSizeRef = dbRef(db, currentUser.userId+"/"+Date.now()+"/size");
        const userFontRef = dbRef(db, currentUser.userId+"/"+Date.now()+"/font");
        
        firebaseSet(userMoodRef, refStringMood);
        firebaseSet(userColorRef, refStringColor);
        firebaseSet(userSizeRef, refStringSize);
        firebaseSet(userFontRef, refStringFont);
    }

    return (
        <ul className='settingsNavBar'>
            <li className='settings-menu-container'>
                <p className="edit-your-page-text">Edit Your Page</p>
            </li>
            <hr className="settings-line"></hr>
            <div className='settingsListItemContainer'>
                <li className='settingsListItem'><p className="mb-1">Let's set the font.</p></li>
                {fontSelector()}

                <li className='settingsListItem'><p className="mb-1">Express your feelings as large as you want.</p></li>
                {sizeSelector()}

                <li className='settingsListItem'><p className="mb-1">What color speaks your mind ?</p></li>
                {colorSelector()}

                <li className='settingsListItem'><p className="mb-1">Click to change:</p></li>
                {moodSelector()}
                <form >
                    <button className="btn-for-submit-diary" id="user-diary-submit" type="submit" onClick={handleSubmitChange}>Save Changes</button>
                </form>
            </div>
        </ul>
    );
}
