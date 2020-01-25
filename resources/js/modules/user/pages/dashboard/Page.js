import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller';
import { fetchAllChildren, fetchCodes } from '../../service'

class Page extends Component {
  static paginationLimit = 15;
  static displayName = 'UserPage'
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    const user = this.props.user.toJson()
    this.state = {
      user,
      list: [],
      page: 1,
      limit: Page.paginationLimit,
      hasMore: false,
    }

  }

  componentDidMount() {
    //TODO temp
    //this.props.dispatch(fetchCodes()).then(data => console.log(data));

    window.scrollTo(0, 0);
    const {page, limit} = this.state;

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    this.handleFetchChildren({
      page,
      limit,
      newState: {},
    });
  }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.user.toJson()

    if (!_.isEqual(this.state.user, user)) {
      this.setState({ user })
    }
  }

  handleFetchChildren = ({page, limit, newState}) => {
    this.props.dispatch(fetchAllChildren({page, limit}))
      .then(data => {
        this.setState({
          ...newState,
          list: data.data,
          hasMore: data.to < data.total,
        });
      });
  };

  fetchChildren = () => {
    let {page, hasMore} = this.state;
    if (hasMore) {
      ++page;
      const limit = page * Page.paginationLimit;
      this.handleFetchChildren({
        page: 1,
        limit,
        newState: {limit, page},
      });
    }
  };

  loader = () => {
    return (
      <div className="template-list__loading loading loading--active">Loading...</div>
    )
  };

  render() {
    const {list, hasMore, page} = this.state;
    return (
      <main className="col-sm-9 ml-sm-auto ml-lg-auto col-md-9 pt-3" role="main">
        <h1>Dashboard</h1>
        <section className="row">
          <div className="col-12 col-md-9 col-sm-12">
            <InfiniteScroll
              pageStart={page}
              loadMore={this.fetchChildren}
              hasMore={hasMore}
              threshold={50}
              loader={this.loader()}>
              {list.map((item, index) =>
                <p
                  key={`item-${index}`}>{item.firstName}</p>
              )}
            </InfiniteScroll>
          </div>
        </section>
      </main>
    )
  }
}

export default Page
