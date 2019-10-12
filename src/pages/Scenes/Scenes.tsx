import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container } from 'semantic-ui-react';
import { stringify } from 'qs';
import Fractal from '../../components/Fractal/Fractal';
import { Scene } from '../../types';
import storage from '../../utils/storage';
import presets from '../../presets.json';

class Scenes extends Component {
  handleRemove = (scene: Scene) => () => {
    const updated = storage.removeScene(scene);
    if (updated) {
      this.forceUpdate();
    }
  };
  render() {
    const scenes = storage.getScenes();

    return (
      <Container>
        <h1>User scenes</h1>
        <Card.Group>
          {scenes.map((scene, index) => {
            const params = stringify(
              Object.assign({}, { shader: scene.shader, ...scene.uniforms })
            );
            return (
              <Card key={index}>
                <Fractal width={200} height={150} quality={1} {...scene} />
                <Card.Content>
                  <Card.Header>{scene.name}</Card.Header>
                  <Card.Description>Shader: {scene.shader}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button color="green" as={Link} to={`/?${params}`}>
                      Edit
                    </Button>
                    <Button
                      basic
                      color="red"
                      onClick={this.handleRemove(scene)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
        <h1>Preset scenes</h1>
        <Card.Group>
          {presets.map((p, index) => {
            const params = stringify(
              Object.assign({}, { shader: p.shader, ...p.uniforms })
            );
            return (
              <Link key={index} to={`${process.env.PUBLIC_URL}/?${params}`}>
                <Card>
                  <Fractal width={200} height={150} quality={3} {...p} />
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
