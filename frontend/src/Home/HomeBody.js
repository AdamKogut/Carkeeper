import React, { Component } from 'react';
import './HomeBody.css';
import { GridTile, GridList } from 'material-ui';
import { Row } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

class HomeBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      page: 1,
      amt: 20,
      max: 30,
      keys: [],
    };
  }

  handleScroll = () => {

  }

  getRandomColor = () => {
    return `var(--color${parseInt(Math.random() * 5 + 1,10)})`;
  }

  componentDidMount = () => {
    this.getCards()
  }

  getCards = () => {
    let apiKey = 'bc163e66f4194191a0eb9b6e9125dbbe';
    let d = new Date();
    d.setMonth(d.getMonth() - 3);
    let date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    let domains = 'motortrend.com,autonews.com,consumerreports.org,cars.usnews.com,forbes.com,autotrader.com,greencarreports.com'
    let that = this;
    let tempCards = this.state.cards;
    let keys = this.state.keys;
    fetch(`https://newsapi.org/v2/everything?q=cars&language=en&from=${date}&page=${this.state.page}&domains=${domains}&apiKey=${apiKey}`)
      .then((response) => response.json())
      .then(data => {
        // console.log(data)
        for (let i in data.articles) {
          if (!keys.includes(data.articles[i].title)) {
            keys.push(data.articles[i].title);
            tempCards.push(
              <GridTile
                key={data.articles[i].title}
                title={data.articles[i].title}
                subtitle={(data.articles[i].author != null) ? `By ${data.articles[i].author}` : data.articles[i].description}
                onClick={() => window.open(data.articles[i].url, true)}
              >
                {(data.articles[i].urlToImage != null) ?
                  <img src={data.articles[i].urlToImage} alt={data.articles[i].title} />
                  :
                  <div style={{ backgroundColor: that.getRandomColor(), height: '200px' }}></div>
                }
              </GridTile>
            );
            that.setState({ cards: tempCards, max: data.totalResults, keys:keys });
          }
        }
      })
  }

  showMore = () => {
    this.setState({ page: this.state.page + 1 }, this.componentDidMount)
  }

  render() {
    return (
      <Row className='home-paragraph' id='home-paragraph'>
        <InfiniteScroll
          dataLength={this.state.cards.length}
          pullDownToRefresh={false}
          next={this.showMore}
          loader={<h4>Loading...</h4>}
          hasMore={this.state.cards.length < this.state.max}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No more news stories</b>
            </p>
          }
          height='calc(100vh - 57px)'
          style={{ overflowX: 'hidden' }}

        >
          <p>
            CarKeeper is an application that is designed to store information about your car's service schedule. You can add as many cars as you want,
            inside each car as many services you want with either the suggested interval or a custom service interval.
            If you have any questions or suggestions you can email us at carkeepercs252@gmail.com
        </p>
          <hr style={{ borderColor: 'var(--color2)', borderWidth: '3px' }} />
          <h4>Recent Car News</h4>
          <GridList
            cols={4}
            style={{paddingRight:'4px'}}
          >
            {this.state.cards}
          </GridList>
        </InfiniteScroll>
      </Row>
    );
  }
}

export default HomeBody;
