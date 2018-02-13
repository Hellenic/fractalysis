import React, { Component } from 'react';
import { stringify } from 'qs';
import { Link } from 'react-router-dom';
import presets from '../../presets.json';

class Scenes extends Component {
  render() {
    return (
      <section>
        <h1>Preset scenes</h1>
        <ul>
          {
            presets.map((p, index) => {
              const params = stringify(Object.assign({}, { shader: p.shader, ...p.uniforms }));
              return (
                <li>
                  <Link key={index} to={`/?${params}`}>
                    {p.name}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </section>
    );
  }
}

export default Scenes;
