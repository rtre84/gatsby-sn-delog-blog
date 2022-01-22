import React from "react"
import Helmet from "react-helmet"
import {graphql} from 'gatsby'
import Layout from "../components/layout"
import {navigateTo} from "gatsby-link"
import {siteMetadata} from "../../gatsby-config";

const encode = (data) => {
    return Object.keys(data)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
}

const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    fetch('/', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: encode({
            'form-name': form.getAttribute('name'),
            ...this.state,
        }),
    })
        .then(() => navigateTo(form.getAttribute('action')))
        .catch(error => error(error));
};

const handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
};

class ContactPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            site: siteMetadata
        };
    }
// ({ data: {site}, }) => {
    render() {
        return (
            <Layout>
                <Helmet>
                    {/*<title>Contact — {site.siteMetadata.title}</title>*/}
                    <title>Contact — "Serving Niches"</title>
                    {/*<meta name="description" content={"Contact page of " + site.siteMetadata.description || ""}/>*/}
                </Helmet>
                <div className="two-grids -contact">
                    <div className="post-thumbnail" style={{
                        backgroundImage: `url('/assets/alexander-andrews-HgUDpaGPTEA-unsplash.jpg')`,
                        marginBottom: 0
                    }}>
                        <h1 className="post-title">Get in Touch</h1>
                        <p>Let me help you kick start your next project &rarr;</p>
                    </div>
                    <div>
                        {/*<form className="form-container" action="https://sendmail.w3layouts.com/SubmitContactForm" method="post">*/}
                        <form
                            name="serving-niches-form"
                            method="POST"
                            action="/thanks/"
                            data-netlify="true"
                            netlify-honeypot="bot-field"
                            className="form-container"
                            onSubmit={handleSubmit}
                        >
                            <div className="hidden" style={{display: 'none'}}>
                                <label>
                                    Don’t fill this out if you're human:
                                    <input name="bot-field" onChange={handleChange}/>
                                </label>
                            </div>
                            <div>
                                <label htmlFor="w3lName">Name</label>
                                <input type="text" name="name" id="w3lName"/>
                            </div>
                            <div>
                                <label htmlFor="w3lSender">Email</label>
                                <input type="email" name="sender" id="w3lSender"/>
                            </div>
                            <div>
                                <label htmlFor="w3lSubject">Subject</label>
                                <input type="text" name="subject" id="w3lSubject"/>
                            </div>
                            <div>
                                <label htmlFor="w3lMessage">Message</label>
                                <textarea name="message" id="w3lMessage"></textarea>
                            </div>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <input type="submit" className="button -primary" style={{marginRight: 0}}/>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        )
    }
}
// export default ContactPage

// function encode(data) {
//     return Object.keys(data)
//         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
//         .join('&');
// }

// class ContactPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//
//     handleChange = (event) => {
//         this.setState({ [event.target.name]: event.target.value });
//     };
//
//     handleSubmit = (event) => {
//         event.preventDefault();
//         const form = event.target;
//         fetch('/', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//             body: encode({
//                 'form-name': form.getAttribute('name'),
//                 ...this.state,
//             }),
//         })
//             .then(() => navigateTo(form.getAttribute('action')))
//             .catch(error => error(error));
//     };
//
//     render(title) {
//         return (
//             <div>
//                 <h1>{title || 'Messages make the world go round.'}</h1>
//                 <p>
//                     Reach out and say hello.
//                     <br />
//                 </p>
//
//                 <form
//                     name="serving-niches-form"
//                     method="POST"
//                     action="/sent/"
//                     data-netlify="true"
//                     netlify-honeypot="bot-field"
//                     className="contact-form"
//                     onSubmit={this.handleSubmit}
//                 >
//                     <p className="hidden" style={{ display: 'None' }}>
//                         <label>
//                             Don’t fill this out if you're human:
//                             <input name="bot-field" onChange={this.handleChange} />
//                         </label>
//                     </p>
//                     <p>
//                         <label>Name:</label>
//                         <input id="w3lName" className="form-control" type="text" name="name" onChange={this.handleChange} />
//                     </p>
//                     <p>
//                         <label>Email:</label>
//                         <input id="w3lEmail" className="form-control" type="text" name="email" onChange={this.handleChange} />
//                     </p>
//                     <p>
//                         <label>Message:</label>
//                         <textarea id="w3lMessage" className="form-control textarea" name="message" onChange={this.handleChange} />
//                     </p>
//                     <button className="button -primary" style={{marginRight: 0}} className="square-button form-control" type="submit">Send</button>
//                 </form>
//
//             </div>
//         );
//     }
// }

export default ContactPage;


export const pageQuery = graphql`
    query ContactPageQuery{
        site {
            siteMetadata {
                title
                description
            }
        }
    }
`
