import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container } from 'semantic-ui-react';
import { stringify } from 'qs';
import Fractal from '../../components/Fractal/Fractal';
import presets from '../../presets.json';

class Scenes extends Component {
  render() {
    return (
      <Container>
        <h1>Preset scenes</h1>
        <Card.Group>
          {presets.map((p, index) => {
            const params = stringify(
              Object.assign({}, { shader: p.shader, ...p.uniforms })
            );
            return (
              <Link key={index} to={`/?${params}`}>
                <Card>
                  <Fractal width={200} height={150} {...p} />
                  <Card.Content>
                    <Card.Header>{p.name}</Card.Header>
                    <Card.Description>Shader: {p.shader}</Card.Description>
                  </Card.Content>
                </Card>
              </Link>
            );
          })}
        </Card.Group>
      </Container>
    );
  }
}

export default Scenes;
