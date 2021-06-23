import './Footer.css';

export function Footer() {
    return (
        <div className="Footer">
            <h4 className="contributors">Contributors</h4>
            <div className="contributor">
                <img src={ process.env.PUBLIC_URL + '/GitHub-Mark-32px.png' } className="GHLogo" alt="Link to Anthony Abrignani's GitHub" /><a className="link" href="https://github.com/anthonyabrignani" >@anthonyabrignani</a>
            </div>
            <div className="contributor">
                <img src={ process.env.PUBLIC_URL + '/GitHub-Mark-32px.png' } className="GHLogo" alt="Link to Amber Holland's GitHub" /><a className="link" href="https://github.com/amshholland">@amshholland</a>
            </div>
            <div className="contributor">
                <img src={ process.env.PUBLIC_URL + '/GitHub-Mark-32px.png' } className="GHLogo" alt="Link to Curtis Punches's GitHub" /><a className="link" href="https://github.com/PunchesC">@PunchesC</a>
            </div>
        </div>
    );
}