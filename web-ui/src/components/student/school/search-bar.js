import React, { Component, Fragment } from 'react';
import { API } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AsyncSelect from 'react-select/async';
import School from './School';
import './style.css';

class SearchBar extends Component {
  state = {
    selected: [],
    anchorEl: null,
    added: [],
  };

  onChange = (val) => {
    this.setState({ selected: val });
  };

  loadOptions = (query) => {
    return API.get('api', '/college/search', {
      queryStringParameters: {
        name: query,
      },
    }).then((resp) => {
      return resp.map((i) => ({ label: i['school.name'], value: i.id }));
    });
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  onAdd = (target, college) => {
    this.handleClose();
    this.props.onAddSchool(target, college).then(
      () => {
        this.setState({
          added: [...this.state.added, college.value]
        });
      }
    );
  };

  render() {
    const { selected, anchorEl, added } = this.state;
    return (
      <div>
        <div className="row mb-4 search-bar">
          <AsyncSelect
            cacheOptions
            defaultOptions
            isMulti
            loadOptions={this.loadOptions}
            onChange={this.onChange}
            value={selected}
            placeholder="Search colleges"
          />
        </div>
        <div className="row">
          {selected &&
            selected.map((i) => (
              <div className="col col-md-6 col-lg-5" key={i.value}>
                <School
                  collegeId={i.value}
                  renderActions={() =>
                    added.includes(i.value) ? (
                      <Button color="secondary">Remove</Button>
                    ) : (
                      <Fragment>
                        <Button color="primary" onClick={this.handleClick}>
                          Add To
                        </Button>
                        <Menu
                          autoFocus={false}
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={this.handleClose}
                        >
                          <MenuItem onClick={() => this.onAdd('reach', i)}>
                            Reach
                          </MenuItem>
                          <MenuItem onClick={() => this.onAdd('target', i)}>
                            Target
                          </MenuItem>
                          <MenuItem onClick={() => this.onAdd('match', i)}>
                            Match
                          </MenuItem>
                        </Menu>
                      </Fragment>
                    )
                  }
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default SearchBar;
