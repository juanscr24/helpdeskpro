import React from 'react';
import { Textarea } from '@src/components/ui/Textarea';
import { Button } from '@src/components/ui/Button';

interface Comment {
  id: number;
  author: string;
  isAgent?: boolean;
  message: string;
  createdAt: string;
}

interface CommentSectionProps {
  comments?: Comment[];
  onAddComment?: (message: string) => void;
}

const defaultComments: Comment[] = [
  {
    id: 1,
    author: 'Juan Cardona',
    isAgent: false,
    message: '¿Cuándo estará listo? He estado esperando bastante tiempo.',
    createdAt: '2025-12-09 10:30',
  },
  {
    id: 2,
    author: 'Agent1',
    isAgent: true,
    message: 'Trabajando en ello, te actualizo en 2 horas. Disculpa la demora.',
    createdAt: '2025-12-09 11:00',
  },
  {
    id: 3,
    author: 'Juan Cardona',
    isAgent: false,
    message: 'Gracias por la actualización. Quedaré atento.',
    createdAt: '2025-12-09 11:15',
  },
];

export const CommentSection = ({
  comments = defaultComments,
  onAddComment,
}: CommentSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Comentarios</h2>

      {/* Comments Thread */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`p-4 rounded-lg ${
              comment.isAgent ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-gray-600">
                  {comment.author.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{comment.author}</p>
                {comment.isAgent && (
                  <span className="inline-block px-2 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                    Agente
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">{comment.createdAt}</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{comment.message}</p>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Agregar Comentario</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAddComment?.('');
          }}
          className="space-y-4"
        >
          <Textarea
            placeholder="Escribe tu comentario aquí..."
            rows={4}
            required
          />
          <div className="flex gap-3">
            <Button type="submit" variant="primary" className="flex-1">
              Enviar Respuesta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
