import React, { Component } from "react";
import { connect } from 'react-redux';
import { BarChart, 
    CartesianGrid, 
    YAxis, 
    XAxis,
    Tooltip,
    Bar } from 'recharts';

function mapStateToProps(state){
  return {
    articles: state.articles
  };
}

class ArticleCharts extends Component {

    componentWillMount(){
        const data = this.props.articles.sort((a1,a2) => {
            return a1.title > a2.title;
        }).map((art) => {
            return { id: art.id, title: art.title.substring(0,15), likes: art.likes.length}
        });
        this.setState({chartData: data});
    }

    render() {
        return (
            <div>
                <h2>Analytics</h2>
                <div>
                    <h3>Likes per Article</h3>
                    <BarChart width={650} height={450} data={this.state.chartData}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="title"  interval={0} label="" />
                        <YAxis allowDecimals={false} />
                        <Tooltip/>
                        <Bar dataKey="likes" label="Number of likes" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ArticleCharts);