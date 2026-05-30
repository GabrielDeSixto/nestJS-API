import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { Category } from './category.entity';

@Entity({ name: 'posts' })

export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ type: 'varchar', length: 255, name: 'cover_image', nullable: true })
    coverImage: string;

    @Column({ type: 'varchar', length: 255, name: 'summary', nullable: true })
    summary: string;

    @Column({ type: 'boolean', default: true })
    isDraft: boolean;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at'
    })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.posts, { nullable: false }) // nullable: false para que no se pueda crear un post sin un usuario
    @JoinColumn({ name: 'user_id' }) // recomendado para la relacion many to one y poder acceder a la tabla users
    user: User;

    @ManyToMany(() => Category)
    @JoinTable({ // para la relacion many to many es como una tabla intermedia entre las dos tablas
        name: 'posts_categories',
        joinColumn: {
            name: 'post_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        }
    })
    categories: Category[];
}
