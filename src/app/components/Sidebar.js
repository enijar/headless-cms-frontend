import React, { Component } from "react";
import { Link } from "react-router-dom";

const LINKS = [
  {
    pathname: '/',
    title: 'Dashboard',
  },
  {
    title: 'Users',
    children: [
      {
        title: 'All',
        pathname: '/users',
      },
      {
        title: 'New',
        pathname: '/users/new',
      },
    ],
  },
];

export default class Sidebar extends Component {
  state = {
    openLinks: [],
  };

  #toggleOpenLinks = linkId => event => {
    const {openLinks} = this.state;
    const index = openLinks.indexOf(linkId);
    const open = index === -1;
    if (open) {
      openLinks.push(linkId);
    } else {
      openLinks.splice(index, 1);
    }
    const node = event.target.nextSibling;
    node.style.height = 'auto';
    const height = node.offsetHeight;
    node.style.height = `${open ? 0 : height}px`;
    requestAnimationFrame(() => {
      node.style.height = `${open ? height : 0}px`;
    });
    this.setState({openLinks});
  };

  #renderLinks = (links, parentIndex = 0, parentLevel = 0) => {
    return links.map((link, index) => {
      const hasChildren = link.hasOwnProperty('children') && link.children.length > 0;
      return (
        <div
          className={`Sidebar__links-link ${hasChildren ? 'children' : ''}`}
          key={`${parentIndex}.${index}`}
        >
          {!hasChildren && <Link to={link.pathname}>{link.title}</Link>}
          {hasChildren && (
            <>
              <div
                className="Sidebar__links-link-title"
                onClick={this.#toggleOpenLinks(`${parentIndex}.${index}`)}
              >
                {link.title}
              </div>
              <div className="Sidebar__links-link-children">
                {this.#renderLinks(link.children, parentIndex + 1, parentLevel + 1)}
              </div>
            </>
          )}
        </div>
      );
    });
  };

  render () {
    return (
      <div className="Sidebar">
        <div className="Sidebar__logo">
          <h1>Headless CMS</h1>
        </div>
        <div className="Sidebar__links">
          {this.#renderLinks(LINKS)}
        </div>
      </div>
    );
  }
}
