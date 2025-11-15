import { useAuthStore } from '@/store/auth/authStore'
import { useProjectStore, type Project } from '@/store/dashboard/projectStore'
import { cn } from '@/utils/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useDisclosure } from '../../hooks/useDisclore'
import { useProject } from '../../hooks/useProject'

function SelectorProject({ selectedProject }: { selectedProject: Project }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setProject } = useProjectStore(state => state)
  const user = useAuthStore(state => state.user)
  const { projects } = useProject(user?.id ?? "")

  if (projects?.data.length === 0) {
    return (
      <div className="relative flex gap-2 items-start">
        <h2 className="text-text text-2xl font-bold font-Outfit">
          {selectedProject.name ?? "Sin proyecto"}
        </h2>
      </div>
    )
  }

  return (
    <div className="relative flex gap-2 items-start">
      <h2 className="text-text text-2xl font-bold font-Outfit">
        {selectedProject.name ?? ""}
      </h2>

      <button
        onClick={isOpen ? onClose : onOpen}
        className="text-placeholder cursor-pointer"
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* Dropdown animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-bg absolute top-10 left-0 rounded-lg p-2 z-30 flex flex-col shadow-md min-w-[200px]"
          >
            {projects?.data.map((data: Project) => (
              <motion.button
                key={data.id}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
                onClick={() => {
                  setProject(data)
                  onClose()
                }}
                className={cn("text-left px-3 py-2 rounded-md text-placeholder", {
                  "bg-primary-500 text-text": selectedProject.id === data.id
                })}
              >
                {data.name}
              </motion.button>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SelectorProject
