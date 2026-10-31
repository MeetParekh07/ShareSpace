import { useState } from "react"
import { Inbox } from "lucide-react"
import Button from "../components/ui/Button"
import Card from "../components/ui/Card"
import EmptyState from "../components/ui/EmptyState"
import Input from "../components/ui/Input"
import Modal from "../components/ui/Modal"
import PageHeader from "../components/ui/PageHeader"
import Select from "../components/ui/Select"
import Skeleton from "../components/ui/Skeleton"
import StatusBadge from "../components/ui/StatusBadge"
import Textarea from "../components/ui/Textarea"

const statuses = ["pending", "approved", "rejected", "borrowed", "completed"]

function DesignSystem() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="space-y-8">
      <PageHeader
        title="Design system"
        description="Reusable ShareSpace UI components. Use these instead of creating new one-off styles."
      />

      <Card>
        <h2 className="mb-4 text-base font-semibold text-navy">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-base font-semibold text-navy">Form fields</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Full name" placeholder="Alex Rivera" hint="Visible to neighbors." />
          <Select
            label="Category"
            placeholder="Select one"
            options={[
              { value: "tools", label: "Tools" },
              { value: "books", label: "Books" },
            ]}
          />
          <div className="md:col-span-2">
            <Textarea label="Description" placeholder="Add a short note" />
          </div>
          <Input label="Email" placeholder="you@email.com" error="Enter a valid email." />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-base font-semibold text-navy">Status badges</h2>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-base font-semibold text-navy">Modal</h2>
        <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirm action"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
            </>
          }
        >
          This dialog uses the shared Modal component. Press Escape or click the overlay to close it.
        </Modal>
      </Card>

      <Card>
        <h2 className="mb-4 text-base font-semibold text-navy">Empty state</h2>
        <EmptyState
          icon={Inbox}
          title="Nothing to show"
          description="This is the shared empty state for lists, search results, and dashboards."
          action={<Button variant="secondary">Add an item</Button>}
        />
      </Card>

      <Card>
        <h2 className="mb-4 text-base font-semibold text-navy">Loading skeleton</h2>
        <div className="space-y-3" aria-busy="true" aria-live="polite">
          <Skeleton variant="title" />
          <Skeleton />
          <Skeleton className="w-2/3" />
          <div className="flex items-center gap-3 pt-2">
            <Skeleton variant="avatar" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-1/2" />
              <Skeleton className="w-1/3" />
            </div>
          </div>
          <Skeleton variant="card" />
        </div>
      </Card>
    </section>
  )
}

export default DesignSystem
