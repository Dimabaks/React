import Button from "./Button"

export default function Main() {
    return(
         <main className="component-showcase">
        <section className="component-group">
          <h2>Variants</h2>
          <div className="component-card">
            <Button size="large" text="TEXT" icon="👌" isDisabled/>
            <button className="button primary">Primary</button>
            <button className="button secondary">Secondary</button>
            <button className="button danger">Danger</button>
            <button className="button gradient">Gradient</button>
            <button className="button outline">Outline</button>
          </div>
        </section>

        <section className="component-group">
          <h2>Sizes</h2>
          <div className="component-card">
            <button className="button small primary">Small</button>
            <button className="button medium primary">Medium</button>
            <button className="button large primary">Large</button>
          </div>
        </section>

        <section className="component-group">
          <h2>Button States</h2>
          <div className="component-card">
            <button className="button primary">Default</button>
            <button className="button primary disabled">Disabled</button>
          </div>
        </section>

        <section className="component-group">
          <h2>Full Width Button</h2>
          <div className="component-card">
            <button className="button secondary full-width">Full Width</button>
          </div>
        </section>
      </main>
    )
}