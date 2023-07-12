import React from 'react';
 
export function Header(props){
    return(
        <header>
            <h1>{props}</h1>
        </header>
    )
}

export function PicCards(props){
    const ourData = props.ourData;
    return(
        <div className="d-flex col-md-6 col-lg-3">
            <div className="card">
                <img className="card-img-top" src={ourData.img} alt={ourData.name} /> 
                <div className="card-body">
                    <div className="col-sm">
                        <h2 className="card-title text-center">{ourData.name}</h2>
                        <p className="card-text">{ourData.descr}</p>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export function Who(props){;
    return(
        <div className="col-12">
            <div className="card mb-4">
                
                <div className="card-body">
                    <h2 className="aboutus">Who We Are</h2>
                    <div className="row">
                        <div className="col-sm-12">
                                
                            <p className="card-text">{props} </p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}


export function AboutUs(props){
    const ppl = props.people;
    let newCardArray = ppl.map((obj) => {
        let newCard = <PicCards key={obj.name} ourData={obj} />
        return newCard;
    })
    return(
        <div>
            {Header("About Us")}

            <div className="container" id="aboutus">
            <div className="row">
                {Who("We are a group of informatics students looking to improve the journaling world by creating an easy-to-use journal and diary for UW students. This website features a classic diary you can use to reflect on your day, but also includes many trackers that can keep you organized, and a statistics page to help you see what your life is like holistically using charts.")}
                {newCardArray}
            </div>
        </div>
        </div>


    )
}

