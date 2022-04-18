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
        console.log(event.target.getAttribute('name'));

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

    handleChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({[event.target.getAttribute('name')]: event.target.getAttribute('value')});
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
                            method="POST"
                            // target="/thanks?no-cache=1"
                            action="https://getform.io/f/e49ad0fd-7e8e-4ac3-95c0-eb1810cb13ce"
                            className="form-container"
                            // onSubmit={this.handleSubmit}
                            target="_blank"
                        >
                            <input type="hidden" name="bot-field" />
                            <input type="hidden" name="serving-niches-form" value="contact" />
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
                                <input type="submit" className="button" style={{marginRight: 0}}/>
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
