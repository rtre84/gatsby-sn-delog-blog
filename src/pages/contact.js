import React from "react"
import Helmet from "react-helmet"
import {graphql} from 'gatsby'
import Layout from "../components/layout"
import {navigateTo} from "gatsby-link"

const encode = (data) => {
    return Object.keys(data)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
}

class ContactPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        fetch('/', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: encode({
                'form-name': form.getAttribute('name'),
                // ...this.state,
            }),
        })
            .then(() => navigateTo(form.getAttribute('action')))
            .catch(error => error(error));
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        return (
            <Layout>
                <Helmet>
                    <title>Contact — "Serving Niches"</title>
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
                        <form
                            name="serving-niches-form"
                            method="POST"
                            action="/thanks/"
                            data-netlify="true"
                            netlify-honeypot="bot-field"
                            className="form-container"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="hidden" style={{display: 'none'}}>
                                <label>
                                    Don’t fill this out if you're human:
                                    <input name="bot-field" onChange={this.handleChange}/>
                                </label>
                            </div>
                            <div>
                                <label htmlFor="w3lName">Name</label>
                                <input type="text" name="name" id="w3lName"/>
                            </div>
                            <div>
                                <label htmlFor="w3lSender">Email</label>
                                <input type="email" name="email" id="w3lSender"/>
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
